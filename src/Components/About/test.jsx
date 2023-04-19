import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Ash from '../assets/ash.jpg';
import Tyler from '../assets/tyler.jpg';


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  padding: '1em',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#90caf9',
  height: 600,
  width: 600,
  boxShadow: 24,
  border: '3px solid #000',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
 
};
const closeButtonStyle = {
  position: 'absolute',
  top: '0.5em',
  right: '0.5em',
  cursor: 'pointer',
};



function About({ aboutus }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showImage, setShowImage] = useState(true);

  const handleImageClick = () => {
    setShowImage(false);
    handleOpen();
  }

  const handleModalClose = () => {
    setShowImage(true);
    handleClose();
  }

  return (
    <>
      <Grid container direction="column">
      <Typography sx={{fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1rem'}}>Welcome to Polished Profiles</Typography>
        <Typography sx={{marginBottom: '1rem'}}>The ultimate job application tool for the modern professional. Say goodbye to endless formatting and tailoring of resumes and cover letters to fit each job application. With Polished Profiles, you can simply upload your resume and the job description, and let our app take care of the rest.</Typography>
        <Typography sx={{marginBottom: '1rem'}}>Our advanced algorithms analyze the job description and match it with your skills and experience. The app then creates a tailored resume and cover letter that specifically highlights your relevant experience and qualifications for that job.</Typography>
        <Typography sx={{marginBottom: '1rem'}}>Whether you're looking to switch careers or just want to stand out from the crowd in your job search, Polished Profiles has got you covered. With our easy-to-use platform, you can submit multiple job applications in just minutes, without compromising on quality.</Typography>
        <Typography sx={{marginBottom: '1rem'}}>Join the thousands of professionals who have already taken their job search to the next level with Polished Profiles. Start your journey towards your dream job today!</Typography>
        <Typography sx={{fontWeight: 'bold', fontSize: '1.5rem', marginTop: '1rem'}}>About the Developers</Typography>
        <Typography sx={{marginBottom: '1rem', fontSize:'1.2rem'}}>Ashwini Uppal</Typography>
        {showImage && <img src={Ash} alt="Ashwini" onClick={handleImageClick} style={{width:'200px' , height:'250px', cursor: 'pointer'}} />}

        
        <Modal open={open} onClose={handleModalClose}>
          <Box sx={modalStyle}>
          <div style={closeButtonStyle} onClick={handleModalClose}>X</div>
            {!showImage && <img src={Ash} alt="Ashwini" style={{width: '200px', maxHeight: '380px',margin: '20px'}} />}

            <Typography sx={{marginTop: '1em'}}>As a former educator, I witnessed my co-workers struggling with technology during the pandemic. This inspired me to pursue a new career as a full stack software developer and create a simple app for educators. Learning to code has allowed me to contribute to my former profession in a unique and valuable way, while also being involved in education in an innovative way. My experience exemplifies how difficult times can inspire personal growth and taking action on new ideas can lead to meaningful results.</Typography>
   
            
            <Typography variant='body1' sx={{marginTop: '1em'}}>
              {aboutus}
            </Typography>
          </Box>
        </Modal>
      </Grid>
    </>
  );
};

export default About;
