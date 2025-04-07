import React, { useEffect, useState } from 'react';
import { fetchJobs } from '../services/apiService'; // Ensure this path is correct
// JobList.js
import './JobList.css'; // Make sure this path is correct based on your project structure

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchJobs().then(setJobs).catch(err => {
            console.error('Failed to fetch jobs:', err);
            setError('Failed to load jobs. ' + err.message);
        });
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {jobs.length > 0 ? (
                jobs.map(job => (
                    <div key={job._id}>
                        <h3>{job.title}</h3>
                        <p>{job.location}</p>
                        <p>${job.salary}</p>
                        {/* Display other job details as needed */}
                    </div>
                ))
            ) : (
                <p>No jobs found.</p>
            )}
        </div>
    );
};

export default JobList;
