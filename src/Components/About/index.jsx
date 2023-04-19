import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Ash from '../assets/ash.jpg';
import Tyler from '../assets/tyler.jpg';
import Brenda from '../assets/brenda.jpg';
import Rafael from '../assets/rafael.png';
import John from '../assets/john.png';

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '1em',
  border: '1px solid #ddd',
  padding: '1em',
  boxShadow: '0px 2px 4px rgba(0,0,0,0.15)',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 4px 6px rgba(0,0,0,0.2)',
  }
};


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  padding: '1em',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#f0f8ff',
  height: 600,
  width: 600,
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '1em',

};

const closeButtonStyle = {
  position: 'absolute',
  top: '0.5em',
  right: '0.5em',
  cursor: 'pointer',
};

const developers = [
  {
    name: "John Chavez",
    image: John,
    bio: "Hello, my name is John Chavez. I’m an Airforce Veteran and recently I’ve become a Full-stack Web Developer. I enjoy finding clever solutions to complex problems, and bringing a cheerful disposition to my daily opportunities."

  },
  {
    name: "Brenda Jow",
    image: Brenda,
    bio: "I am Brenda, a software developer with a background in early childhood education. After years of working as a preschool lead teacher, I decided to change my career path to software development. I have always had a passion for problem-solving and technology, starting from when I was a kid. I began teaching myself coding a few months ago, focusing on Java, and now I am also learning JS with the goal of becoming a professional full-stack developer capable of building websites. Ultimately, I hope to apply my technical and problem-solving skills to make positive contributions to my community, help educate children, or contribute to open source projects.",

  },
  {
    name: "Rafael Aldana Sandoval",
    image: Rafael,
    bio: "Hello everyone, my name is Rafael I’m a web developer specialised in JavaScript, I have a passion for creating products that are innovative, exceed the criteria and that will make the client ecstatic to see their vision fulfilled."
  },
  {
    name: "Tyler Bennett",
    image: Tyler,
    bio: "Air Force veteran turned full-stack developer with a passion for front-end development. With his skills and experience, Tyler brings a unique perspective to every project he works on. Please do not judge my blurb it is ChatGPT approved.",
  },
  {
    name: "Ashwini Uppal",
    image: Ash,
    bio: "As a former educator, I witnessed my co-workers struggling with technology during the pandemic. This inspired me to pursue a new career as a full stack software developer and create a simple app for educators. Learning to code has allowed me to contribute to my former profession in a unique and valuable way, while also being involved in education in an innovative way. My experience exemplifies how difficult times can inspire personal growth and taking action on new ideas can lead to meaningful results.",
  }
];

function About({ aboutus }) {
  const [open, setOpen] = useState(false);
  const [developerIndex, setDeveloperIndex] = useState(null);
  const handleOpen = (index) => {
    setOpen(true);
    setDeveloperIndex(index);
  };
  const handleClose = () => {
    setOpen(false);
    setDeveloperIndex(null);
  };

  const [showImage, setShowImage] = useState(true);

  const handleImageClick = (index) => {
    setShowImage(false);
    handleOpen(index);
  }

  const handleModalClose = () => {
    setShowImage(true);
    handleClose();
  }
  
  return (
    <>
      <Grid container direction="column" sx={{ padding: '2rem' }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1rem' }}>Welcome to Polished Profiles</Typography>
        <Typography sx={{ marginBottom: '1rem' }}>The ultimate job application tool for the modern professional. Say goodbye to endless formatting and tailoring of resumes and cover letters to fit each job application. With Polished Profiles, you can simply upload your resume and the job description, and let our app take care of the rest.</Typography>
        <Typography sx={{ marginBottom: '1rem' }}>Our advanced algorithms analyze the job description and match it with your skills and experience. The app then creates a tailored resume and cover letter that specifically highlights your relevant experience and qualifications for that job.</Typography>
        <Typography sx={{ marginBottom: '1rem' }}>Whether you're looking to switch careers or just want to stand out from the crowd in your job search, Polished Profiles has got you covered. With our easy-to-use platform, you can submit multiple job applications in just minutes, without compromising on quality.</Typography>
        <Typography sx={{ marginBottom: '1rem' }}>Take your job search to the next level with Polished Profiles. Start your journey towards your dream job today!</Typography>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem', marginTop: '1rem' }}>About the Developers</Typography>
  
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {developers.map((developer, index) => (
            <div key={index} style={{ margin: '1rem' }}>
              <Card sx={{ maxWidth: 240, margin: 'auto' }}>
                <CardActionArea onClick={() => handleImageClick(index)}>
                  <CardMedia
                    component="img"
                    height="280"
                    image={developer.image}
                    alt={developer.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {developer.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          ))}
        </div>
  
        <Modal open={open} onClose={handleModalClose}>
          <Box sx={modalStyle}>
            <div style={closeButtonStyle} onClick={handleModalClose}>X</div>
            {developerIndex !== null && (
              <>
                {!showImage && <img src={developers[developerIndex].image} alt={developers[developerIndex].name} style={{ width: '200px', maxHeight: '380px', objectFit: 'cover', margin: '20px' }} />}
                <Typography sx={{ marginTop: '1em' }}>{developers[developerIndex].bio}</Typography>
              </>
            )}
            <Typography variant='body1' sx={{ marginTop: '1em' }}>
              {aboutus}
            </Typography>
          </Box>
        </Modal>
      </Grid>
    </>
  );
}

export default About;
  