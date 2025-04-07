import React from 'react';
import './JobDetails.css'; // Assume you have some basic CSS for styling

const JobDetails = ({ job }) => {
    if (!job) return null; // Return nothing if no job is selected

    return (
        <div className="job-details">
            <h2>{job.title}</h2>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p><strong>Job Types:</strong> {job.jobTypes.join(', ')}</p>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Benefits:</strong> {job.benefits}</p>
            <p><strong>Requirements:</strong> {job.requirements}</p>
            <p><strong>Responsibilities:</strong> {job.responsibilities}</p>
        </div>
    );
};

export default JobDetails;
