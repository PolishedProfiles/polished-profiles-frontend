import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import ReactDOM from "react-dom";
import { Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import InputMethodSelect from "../InputMethodSelect";
import TextInput from "../TextInput";
import PDFInput from "../PDFInput";
import { useAuth0 } from "@auth0/auth0-react";
import html2pdf from 'html2pdf.js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

function DataEntry({ setModalResume }) {

  const [userResume, setUserResume] = useState();
  const [generatedResume, setGeneratedResume] = useState();
  const [inputType, setInputType] = useState("pdf");
  const [pdfFile, setPDFFile] = useState();
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const { user } = useAuth0();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      let response;
      // Prepare payload with job description if it's provided
      const payload = jobDescription
        ? { resume: userResume, jobDescription, email: user.email }
        : { resume: userResume, email: user.email };

      // Handle PDF input type
      if (inputType === "pdf") {
        const formData = new FormData();
        formData.append("resume", pdfFile);
        formData.append('email', user.email)

        if (jobDescription) {
          formData.append("jobDescription", jobDescription);
        }

        response = await axios.post(`${BACKEND_URL}/api/coverLetterPdf`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Handle text input type
        console.log(payload);
        response = await axios.post(`${BACKEND_URL}/api/coverLetter`, payload, {
          headers: {
            "Content-Type": 'application/json',
          },
        });
      }

      // Update state with API response
      setGeneratedResume(response.data.resume);
      setModalResume(response.data.resume);
      setCoverLetter(response.data.coverLetter);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  // Function to handle resume input change
  function handleChange(event) {
    setUserResume(event.target.value);
  }

  // Function to handle job description input change
  function handleJobDescriptionChange(event) {
    setJobDescription(event.target.value);
  }

  // Function to handle input type selection change
  function handleInputTypeChange(event) {
    setInputType(event.target.value);
  }

  // Function to handle file upload for PDF input
  const handleFileUpload = (event) => {
    setPDFFile(event.target.files[0]);
  };

  const generatePDF = async (markdownContent, fileName) => {
    const opt = {
      margin: 0.2,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    const markdownElement = document.createElement('div');
    markdownElement.innerHTML = '<style>body {font-family: Arial, sans-serif;}</style>';
    const markdownRenderer = <ReactMarkdown>{markdownContent}</ReactMarkdown>;
    ReactDOM.render(markdownRenderer, markdownElement);

    html2pdf().from(markdownElement).set(opt).save();
  };

  return (
    <Container maxWidth="md">
      <h1>{user.name}</h1>
      <h2>{user.email}</h2>

      {!loading ? (
        // Render form and input fields when not loading
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            mt: 4,
          }}
        >
          {!generatedResume && <InputMethodSelect
            inputType={inputType}
            handleInputTypeChange={handleInputTypeChange}
          />}
          {/* <div style={{display: 'flex', width: '100%', gap: '2em', justifyContent: 'space-between'}}> */}
          {inputType === "text" && !generatedResume && <TextInput handleChange={handleChange} />}
          {inputType === "pdf" && !generatedResume && <PDFInput handleFileUpload={handleFileUpload} pdfFile={pdfFile} />}
          {!generatedResume && !loading && (
            <>

              <TextField
                label="Job Description"
                multiline
                required
                rows={4}
                fullWidth
                margin="normal"
                variant="outlined"
                value={jobDescription}
                onChange={handleJobDescriptionChange}
              />
            </>
          )}
          {/* </div> */}

          {loading && <CircularProgress />}

          {generatedResume && !loading && (
            <div style={{ display: "flex", gap: "1.5rem", width: "125%" }}>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                  label="Generated Resume"
                  multiline
                  rows={20}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={generatedResume}
                  onChange={(event) => setGeneratedResume(event.target.value)}
                  sx={{ resize: 'horizontal', overflow: 'auto' }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: '70%' }}
                  onClick={() => generatePDF(generatedResume, `${user.email}-resume.pdf`)}
                >
                  Download Updated Resume
                </Button>
                <ReactMarkdown id="resume-markdown">{generatedResume}</ReactMarkdown>
              </div>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                  label="Cover Letter"
                  multiline
                  rows={20}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={coverLetter}
                  onChange={(event) => setCoverLetter(event.target.value)}
                  sx={{ resize: 'horizontal', overflow: 'auto' }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: '70%' }}
                  onClick={() => generatePDF(coverLetter, `${user.email}-cover-letter.pdf`)}
                >
                  Download Cover Letter
                </Button>
                <ReactMarkdown>{coverLetter}</ReactMarkdown>
              </div>
            </div>
          )}

          {
            !generatedResume
              ? <Button type="submit" variant="contained" color="primary">Generate</Button>
              : null
          }
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            mt: 4,
          }}
        >
          <CircularProgress />
          <Typography sx={{ mt: 4 }}>Perfection takes time! Lean back and let us do the hard part.</Typography>
        </Box>
      )}
    </Container>
  );
}

export default DataEntry;
