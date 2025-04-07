require('dotenv').config({path: "keys.env"});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Ensure CORS is required for cross-origin allowance
const BodyParser = require('body-parser')
const { celebrate, Joi, errors, Segments } = require('celebrate');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(BodyParser.json())

// Middleware
app.use(cors({
    origin: 'http://localhost:3000' // Adjust as necessary to match your frontend URL
})); // Setup CORS
app.use(express.json()); // Allows handling JSON requests

// MongoDB Connection
mongoose.connect(`${process.env.mongoose_string}`)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Define Job Schema
const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number, required: true },
    jobTypes: { type: [String], required: true },
    description: { type: String, required: true },
    benefits: { type: [String], required: true },
    requirements: { type: [String], required: true },
    responsibilities: { type: [String], required: true }
}, { timestamps: true });

const Job = mongoose.model('Job', JobSchema);

// API Endpoints
// POST - Create a new job
app.post(
    '/api/jobs',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        location: Joi.string().required(),
        salary: Joi.number().integer().required(),
        jobTypes: Joi.array().items(Joi.string()).required(),
        description: Joi.string().required(),
        benefits: Joi.array().items(Joi.string()).required(),
        requirements: Joi.array().items(Joi.string()).required(),
        responsibilities: Joi.array().items(Joi.string()).required(),
      })
    }),
    async (req, res) => {
      try {
        const { title, location, salary, jobTypes, description, benefits, requirements, responsibilities } = req.body;
        
        const newJob = new Job({
          title,
          location,
          salary,
          jobTypes,
          description,
          benefits,
          requirements,
          responsibilities
        });
        
        await newJob.save();
        return res.status(201).json({ message: "Job posted successfully", job: newJob });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
      }
    }
  );

// GET - Fetch all jobs
app.get("/api/jobs", async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// PUT - Update a job
app.put('/api/jobs/update', async (req, res) => {
    const job = await Job.findOne();
    if (!job) {
        return res.status(404).json({ message: 'No jobs found' });
    }
    job.status = "Interview";
    await job.save();
    res.json(job);
});

// DELETE - Delete a job
app.delete('/api/jobs/delete', async (req, res) => {
    const job = await Job.findOne();
    if (!job) {
        return res.status(404).json({ message: 'No jobs found' });
    }
    await Job.findByIdAndDelete(job._id);
    res.json({ message: "Job deleted successfully" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


// Test The end point
// Post
// curl -X POST http://localhost:8080/api/jobs

// Get 
// curl http://localhost:8080/api/jobs

// Put
// curl -X PUT http://localhost:8080/api/jobs/update

// Delete
// curl -X DELETE http://localhost:8080/api/jobs/delete