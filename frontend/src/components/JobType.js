import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const JobType = ({ job }) => {
    const pay = !!job?.payRate ? job?.payRate : job?.salary;
    return (
        <Stack 
          useFlexGap
          sx={{
            marginTop: 4, 
            marginBottom: 2,
            flexWrap: 'wrap'
          }}
          direction="row" spacing={1}>
            <Chip label={`$ ${pay} /year`} color="success" sx={{ boarderRadius: 1 }} />
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
  