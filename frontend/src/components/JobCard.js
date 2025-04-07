import React from 'react';
import './JobCard.css';

const JobCard = ({ job, onClick }) => {
    return (
        <div className="job-card" onClick={onClick}>
            <h3>{job.title}</h3>
            <p>{job.location}</p>
            <p>{job.salary}</p>
            <ul>
                {job.jobTypes.map((type, index) => <li key={index}>{type}</li>)}
            </ul>
        </div>
    );
};

export default JobCard;
