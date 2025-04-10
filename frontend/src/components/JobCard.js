import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import JobType from "../components/JobType"
import AddIcon from '@mui/icons-material/Add';
import { daysAgo } from '../utils/utils.js';

const JobCard = ({ job, onCardClicked }) => {
  if (!job) {
    return null;
  }
  return (
    <Card onClick={() => {
      onCardClicked(job?._id)
    }} sx={{ marginBottom: 2 }}>
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
        <JobType job={job}/>
        <Divider orientation="horizontal" flexItem />

          {job?.requirements?.map((requirement) => {
            return (
              <Typography key={requirement} variant="body2" component="div">
                <AddIcon />{requirement}
              </Typography>
            )
          })}
          <Typography sx={{ mt: 2 }} color="primary">
            Posted {daysAgo(job?.createdAt)} days ago
          </Typography>
      </CardContent>
    </Card>
  );
};

export default JobCard;