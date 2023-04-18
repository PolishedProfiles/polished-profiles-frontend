import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React from 'react';

function History() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
      <Box>
        <Typography>
          Header Text in a Modal
        </Typography>
        <Typography>
          Body Text in a Modal
        </Typography>
      </Box>

      </Modal>
    </div>
  )
};

export default History;