import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React from 'react';
import { generatedResume } from '../ResumeEntry/index'

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
      <Grid
        container
        direction="column"
      >
        <Button onClick={handleOpen}>Job Application no.1</Button>
        <Button onClick={handleOpen}>Job Application no.2</Button>
        <Button onClick={handleOpen}>Job Application no.3</Button>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
            <Typography>Header</Typography>
            <Typography variant='body1'>Date</Typography>
            <Typography variant='body1'>
              Body Text goes here
            </Typography>
          </Box>
        </Modal>
      </Grid>
  )
};

export default History;