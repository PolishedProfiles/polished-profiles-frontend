import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Profile from '../Auth0/profile';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
// import { blueGrey } from '@mui/material/colors';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  padding: '1em',
  transform: 'translate(-50%, -50%)',
  height: 700,
  width: 700,
  boxShadow: 24,
  backgroundColor: '#ffffff',
  border: '3px solid #000',
  overflowY: 'scroll',
}

function History({ modalResume, setModalResume }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [history, setHistory] = useState({});
  const { user } = useAuth0();

  const handleOpen = (resume) => {
    setOpen(true)
    setModalResume(resume)
    console.log(resume.resume)
    console.log(resume.coverLetter)

  };

  useEffect(() => {
    const getResume = async () => {
      let payload = {email: user.email}
      let response = await axios.post('http://localhost:3001/api/history', payload);
      setHistory(response.data);
      console.log('Resume proof of life', response.data);
    }
    getResume();
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

console.log('history: history', history)
// useEffect(() => {
//   const getHistory = async () => {
//     if(isAuthenticated){
//       const res = await getIdTokenClaims();
//       console.log(JSON.stringify(res, null, 2));
//       const jwt = res.__raw;
//       console.log('token', jwt);

//       const config = {
//         headers: { "Authorization": `Bearer ${jwt}` },
//         method: 'get',
//         baseURL: process.env.REACT_APP_SERVER,
//         url: '/history'
//       };



//       let response = await axios (config);
//       setHistory(response.data);
//     }
//   }

//   getHistory();
// }, [isAuthenticated, getIdTokenClaims]);

  return (
    <>
      <Profile />
      <Grid
        container
        direction="column"
        >
        {history.length > 0 && history.map((resume, idx) => (
          <Button key={`resume-${idx}`} onClick={() => handleOpen(resume)}>Job Application no.{idx + 1}</Button>
        ))}

        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={modalStyle}>
            <Typography sx={{mb: 3}} variant='h4'>Cover Letter</Typography>
            <Typography sx={{mb: 3}} variant='body1'>
            { modalResume.coverLetter }
            </Typography>
            <Typography sx={{mb: 3}} variant='h4'>Resume</Typography>
            <Typography sx={{mb: 3}} variant='body1'>
              { modalResume.resume }
            </Typography>
          </Box>
        </Modal>
      </Grid>
    </>
  )
};

export default History;