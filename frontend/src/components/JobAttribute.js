import React from 'react';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { Divider } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const JobAttribute = ({ title, subTitle, attributes }) => {
    if(!subTitle && (!attributes || attributes.length === 0)) return null;
    return (
    <Stack sx={{ marginTop:2 }} spacing={1}>
        <Typography sx={{ fontWeight: 'bold' }} variant="h5" component="div">
          {title}
        </Typography>
        { subTitle && ( 
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {subTitle}
          </Typography>
        )}
        {attributes?.map((attribute) => {
            return (
              <Typography 
                variant="body2" 
                component="div"
                key={attribute}
              >
                <AddIcon />
                  {attribute}
              </Typography>)
        })}
        <Box sx={{ marginTop:2, marginBottom:1 }}>
            <Divider orientation="horizontal" flexItem />
        </Box>
    </Stack>
  );
};

export default JobAttribute;