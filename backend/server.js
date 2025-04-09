require('dotenv').config({path: "keys.env"});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Ensure CORS is required for cross-origin allowance
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const expressSession = require('express-session');
const { celebrate, Joi, errors, Segments } = require('celebrate');
const serverless = require('serverless-http');

const app = express();

// Middleware
app.use(cors({
    origin: '*' // Adjust as necessary to match your frontend URL
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

// Define User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);




const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// POST - User Sign Up
app.post('/api/auth/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Received login request:', req.body); // Log the incoming request

    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User not found for email: ${email}`);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('User found:', user);

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('Password match successful');

    // Create JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('JWT token created:', token);
    return res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error); // Log the actual error
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});


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
  verifyToken, // Protecting job creation endpoint with JWT
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
app.get('/', (req, res) => {
  console.log('Server started');
  return res.json({ message: '/api/jobs to get started' });
}
);

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
const PORT = process.env.PORT || 4000;
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