// src/components/Home.js

import React, { useEffect, useState } from 'react';
import { fetchJobs } from '../services/apiService';

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const fetchedJobs = await fetchJobs();
        setJobs(fetchedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    getJobs();
  }, []);

  return (
    <div className="job-postings-container">
      <h1>Job Postings</h1>
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <div key={index} className="job-card">
            <h2 className="job-title">{job.title}</h2>
            <p className="job-details"><strong>Location:</strong> {job.location}</p>
            <p className="salary"><strong>Salary:</strong> ${job.salary}</p>
            <p className="job-details"><strong>Job Types:</strong> {job.jobTypes.join(', ')}</p>
            <p className="job-details"><strong>Description:</strong> {job.description}</p>
            <p className="job-details"><strong>Benefits:</strong> {job.benefits.join(', ')}</p>
            <p className="job-details"><strong>Requirements:</strong> {job.requirements.join(', ')}</p>
            <p className="job-details"><strong>Responsibilities:</strong> {job.responsibilities.join(', ')}</p>
          </div>
        ))
      ) : (
        <p>No jobs found</p>
      )}
    </div>
  );
};

export default Home;
