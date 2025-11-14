import mongoose from "mongoose"

const JobSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: String,
  location: String,
  experience: String,
  salary: String,
  function: String,
  industry: String,
  fullStack: { type: Boolean, default: false },
  jobType: String,
  description: String,
  skills: { type: [String], default: [] },

  // NEW FIELDS
  postedAt: { type: Date, default: Date.now },
  applicants: { type: Number, default: 0 },

  saved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
export const Job = mongoose.model('Job', JobSchema);
