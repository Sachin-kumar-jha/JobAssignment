import express from "express"
const router = express.Router();

import {Job} from "../model/Job.js"
// GET jobs with filters & pagination
// Example query: /api/jobs?page=1&limit=10&location=Delhi&experience=2-4%20yrs&fullStack=true
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, q } = req.query;
    const query = {};

    // handle array or single values for filters
    const addIn = (field) => {
      if (!req.query[field]) return;
      const val = req.query[field];
      if (Array.isArray(val)) query[field] = { $in: val };
      else query[field] = { $in: Array.isArray(val) ? val : [val] };
    };

    addIn('location');
    addIn('experience');
    addIn('salary');
    if (req.query.function) addIn('function'); // 'function' is reserved word in JS; use string key
    addIn('industry');
    addIn('jobType');

    if (typeof req.query.fullStack !== 'undefined') {
      // expects "true"/"false"
      query.fullStack = req.query.fullStack === 'true';
    }

    if (q) {
      query.$or = [
        { role: new RegExp(q, 'i') },
        { company: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const docs = await Job.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));
    const total = await Job.countDocuments(query);
    res.json({ data: docs, page: parseInt(page), pages: Math.ceil(total / limit), total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET job by id
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create job
router.post('/', async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST toggle save
router.post('/:id/save', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Not found' });
    job.saved = !job.saved;
    await job.save();
    res.json({ saved: job.saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export const jobsRouter = router;
