import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const JobType = ({ job }) => {
    return (
        <Stack sx={{
          marginTop: 4, 
          marginBottom: 2
        }}
          direction="row" spacing={1}>
            <Chip label={`$ ${job?.salary} /year`} color="success" sx={{ boarderRadius: 1 }} />
            {
                job?.jobTypes?.map((jobType) => {
                    return (
                    <Chip
                      key={jobType}
                      label={jobType} 
                      color="success" 
                      variant="outlined" 
                    />
                  )
                })
            }
        </Stack>
    );
  };
  
export default JobType;
  