import React from 'react';
import './JobDetails.css'; // Assume you have some basic CSS for styling
import JobAttribute from './JobAttribute';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Chip, Stack, Box, Divider } from '@mui/material';

const JobDetails = ({ job }) => {
  const pay = !!job?.payRate ? job?.payRate : job?.salary;
  if (!job) return null; // Return nothing if no job is selected

  return (
    <Card sx={{ position: "sticky", top: "1rem", minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontWeight: 'bold' }} variant="h5" component="div">
          {job?.title}
        </Typography>
        <Typography color="text.secondary">
          {job?.companyName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {job?.location}
        </Typography>
        <Stack sx={{ marginTop: 3, marginBottom: 2 }} direction="row" spacing={2}>
          <Chip label={`$ ${pay} /year`} color="secondary" sx={{ borderRadius: 1 }} />
          {job?.jobTypes?.map((jobType) => (
            <Chip 
              label={jobType} 
              color="secondary" 
              variant="outlined"
              key={jobType} 
            />
          ))}
        </Stack>
        <Box sx={{ marginTop: 2, marginBottom: 1 }}>
          <Divider orientation="horizontal" flexItem />
        </Box>
        <JobAttribute title="Description:" subTitle={job?.description} />
        <JobAttribute title="Benefits:" attributes={job?.benefits} />
        <JobAttribute title="Requirements:" attributes={job?.requirements} />
        <JobAttribute title="Responsibilities:" attributes={job?.responsibilities} />
      </CardContent>
    </Card>
  );
};

export default JobDetails;