import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Profile from '../Auth0/profile';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function History() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [history, setHistory] = useState({});
  const { user, isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
console.log('history: history', history)
useEffect(() => {
  const getHistory = async () => {
    if(isAuthenticated){
      const res = await getIdTokenClaims();
      const jwt = res.__raw;
      console.log('token', jwt);

      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/history'
      };

      let response = await axios (config);
      setHistory(response.data);
    }
  }

  getHistory();
}, []);

  return (
    <>
      <Profile />
      <Grid
        container
        direction="column"
      >
        <Button onClick={handleOpen}>
          Job Application no.1
        </Button>
        <Button>Job Application no.2</Button>
        <Button>Job Application no.3</Button>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
            <Typography variant='h3'>
              Header Text in a Modal
            </Typography>
            <Typography variant='body1'>
              Body Text in a Modal
            </Typography>
          </Box>
        </Modal>
      </Grid>
    </>
  )
};

export default History;