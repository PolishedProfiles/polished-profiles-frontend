import { useState, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import InputMethodSelect from "../InputMethodSelect";
import TextInput from "../TextInput";
import PDFInput from "../PDFInput";
import { useAuth0 } from "@auth0/auth0-react";

// import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
// import jsPDF from "jspdf";

// The main DataEntry component
function DataEntry({ setModalResume }) {
  // State variables to store user input and API response
  const [userResume, setUserResume] = useState();
  const [generatedResume, setGeneratedResume] = useState();
  const [inputType, setInputType] = useState("pdf");
  const [pdfFile, setPDFFile] = useState();
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const { user } = useAuth0();

  const resumeRef = useRef();

  // Function to handle form submission
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

        response = await axios.post("http://localhost:3001/api/coverLetterPdf", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Handle text input type
        console.log(payload);
        response = await axios.post("http://localhost:3001/api/coverLetter", payload, {
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

  const generatePDF = async (resumeMarkdown) => {
    const opt = {
      margin: 0.2,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    const resumeElement = resumeRef.current;
    html2pdf().from(resumeElement).set(opt).save();

  };

  return (
    <Container maxWidth="md">
      <h1>{user.email}</h1>
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
          {inputType === "text" && !generatedResume && <TextInput handleChange={handleChange} />}
          {inputType === "pdf" && !generatedResume && <PDFInput handleFileUpload={handleFileUpload} pdfFile={pdfFile} />}
          {!generatedResume && !loading && (
            <>

              <TextField
                label="Job Description"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                variant="outlined"
                value={jobDescription}
                onChange={handleJobDescriptionChange}
              />
            </>
          )}

          {loading && <CircularProgress />}

          {generatedResume && !loading && (
            <TextField
              label="Generated Resume"
              multiline
              rows={20}
              fullWidth
              margin="normal"
              variant="outlined"
              value={generatedResume}
              onChange={(event) => setGeneratedResume(event.target.value)}
            />
          )}


          <Button type="submit" variant="contained" color="primary">
            Generate
          </Button>
          <Button onClick={() => generatePDF(generatedResume)}>Download</Button>
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
      <Box ref={resumeRef} sx={{ width: "100%", textAlign: "left", mt: 4 }}>
        <ReactMarkdown id="resume-markdown">{generatedResume}</ReactMarkdown>
        <ReactMarkdown>{coverLetter}</ReactMarkdown>
      </Box>
    </Container>
  );
}

export default DataEntry;
