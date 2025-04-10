import React from 'react';
import './JobList.css'; // Make sure this path is correct based on your project structure
import JobCard from './JobCard';

const JobList = ({jobs, loading, onCardClicked}) => {
    if(loading) return null;
    return (
        <div>
            {jobs.length > 0 ? (
                jobs.map(job => (       
                    <JobCard job={job} key={job?._id} onCardClicked={onCardClicked}/>       
                ))
            ) : (
                <p>No jobs found.</p>
            )}
        </div>
    );
};

export default JobList;