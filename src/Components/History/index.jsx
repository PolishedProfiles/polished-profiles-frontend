import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

function History() {
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            Test Accordion
          </Typography>
          <Typography>
            Date
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This is a test of the giant voice system!
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            Test Accordion No. 2 (Electric Boogaloo)
          </Typography>
          <Typography>
            Date
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This is another test of the giant voice system!
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
};

export default History;