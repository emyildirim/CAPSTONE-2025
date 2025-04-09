import React from 'react';
import './JobDetails.css'; // Assume you have some basic CSS for styling
import JobAttribute from './JobAttribute';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Chip, Stack, Box, Divider } from '@mui/material';

const JobDetails = ({ job }) => {
    if (!job) return null; // Return nothing if no job is selected

    return (
        <Card>
            <CardContent>
                <Typography sx={{ fontWeight: 'bold' }} variant="h5" component="div">
                    {job.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {job.location}
                </Typography>
                <Stack sx={{marginTop: 3, marginBottom: 2 }} direction="row" spacing={2}>
                    <Chip label={`$ ${job?.salary} /year`} color="secondary" sx={{ boarderRadius: 1 }} />
                    {job?.jobTypes?.map((jobType) => {
                        return (
                            <Chip 
                                label={jobType} 
                                color="secondary" 
                                variant="outlined"
                                key={jobType} 
                            />
                        )
                    })}
                </Stack>
                <Box sx={{ marginTop:2, marginBottom:1 }}>
                    <Divider orientation="horizontal" flexItem />
                </Box>
                <JobAttribute title="Description:" subTitle={job.description}/>
                <JobAttribute title="Benefits:" attributes={job.benefits}/>
                <JobAttribute title="Requirements:" attributes={job.requirements}/>
                <JobAttribute title="Responsibilities:" attributes={job.responsibilities}/>
            </CardContent>
        </Card>
    );
};

export default JobDetails;
