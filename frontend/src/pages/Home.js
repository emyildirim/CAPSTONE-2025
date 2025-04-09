import React, { useEffect, useState } from 'react';
import { Grid2, Typography } from '@mui/material';
import JobList from '../components/JobList'
import JobDetails from '../components/JobDetails';
import { fetchJobs } from '../services/apiService';
import Layout from '../components/Layout';
import HomeHeader from '../components/HomeHeader';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState();
  const [jobTitleFilter, setJobTitleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState([]);

  const isEmploymentTypeSelected = (jobEmploymentTypes, employmentTypeFilter) => {
    return employmentTypeFilter.every((etFilter) => {
      return jobEmploymentTypes.includes(etFilter);
    })

  }

  const filteredJobs = jobs.filter((job) => {
    if(!jobTitleFilter && !locationFilter && !employmentTypeFilter) return true;
    let keepJob = true;
    if(jobTitleFilter && !job?.title?.toUpperCase().includes(jobTitleFilter.toUpperCase())){
      keepJob = false;
    }
    if(locationFilter && !job?.location?.toUpperCase().includes(locationFilter.toUpperCase())){
      keepJob = false;
    }
    if(employmentTypeFilter?.length > 0 && !isEmploymentTypeSelected(job?.jobTypes, employmentTypeFilter)){
      keepJob = false;
    }
    return keepJob;
  })

  const job = filteredJobs.find((job) => {
    return job._id === selectedJobId;
  })

  useEffect(() => {
    const getJobs = async () => {
      setLoading(true);
      try {
        const fetchedJobs = await fetchJobs();
        setJobs(fetchedJobs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };

    getJobs();
  }, []);

  useEffect(() => {
    if (filteredJobs.length == 0){
      setSelectedJobId("");
    }
  }, [filteredJobs])

  const onCardClicked = (id) => {
    setSelectedJobId(id);
  }

  return (
    <Layout>
      <HomeHeader 
        jobs={jobs} 
        loading={loading}
        jobTitleFilter={jobTitleFilter}
        setJobTitleFilter={setJobTitleFilter}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        employmentTypeFilter={employmentTypeFilter}
        setEmploymentTypeFilter={setEmploymentTypeFilter}
      />
      <Grid2 container spacing={2}>
        <Grid2 size={6}>
          <JobList loading={loading} jobs={filteredJobs} onCardClicked={onCardClicked}/>
        </Grid2>
        <Grid2 size={6}>
          {/* {!selectedJobId && (
            null
          )} */}
          {selectedJobId && (
            <JobDetails job={job}/>
          )}
        </Grid2>
      </Grid2>
    </Layout>
  );
};

export default Home;