import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {jobsRouter} from "./routes/job.route.js";

const app = express();
app.use(cors(
  [{
    origin:"",
    credentials:true,
  }]
));
app.use(express.json());

app.use('/api/jobs', jobsRouter);

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=> console.log('Server running on port', PORT));
  })
  .catch(err => console.error(err));
