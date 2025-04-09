import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar'
import { Container } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { red } from '@mui/material/colors';

export default function Layout({children}) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: "white" }}>
        <AppBar sx={{ backgroundColor: 'white', }} position="static">
          <Toolbar sx={{ backgroundColor: '#fce4ec', color: 'black'}}>
            <Typography component="div" sx={{ flexGrow: 1, textAlign: 'center' }} >
            
                JobGetter
            </Typography>
          </Toolbar>
        
        </AppBar>
        
        <Container sx={{ flexGrow: 1, backgroundColor: "white", marginTop: 1 }}>
            {children}
        </Container>
      </Box>
    );
  }