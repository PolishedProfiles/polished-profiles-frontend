import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import InputMethodSelect from "../InputMethodSelect";
import TextInput from "../TextInput";
import PDFInput from "../PDFInput";

function DataEntry() {
  const [userResume, setUserResume] = useState();
  const [generatedResume, setGeneratedResume] = useState();
  const [inputType, setInputType] = useState("text");
  const [pdfFile, setPDFFile] = useState();
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState('');


  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
  
    try {
      let response;
      const payload = jobDescription
        ? { resume: userResume, jobDescription }
        : { resume: userResume };
  
      if (inputType === "pdf") {
        const formData = new FormData();
        formData.append("resume", pdfFile);
  
        if (jobDescription) {
          formData.append("jobDescription", jobDescription);
        }
  
        response = await axios.post("http://localhost:3001/api/coverLetterPdf", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await axios.post("http://localhost:3001/api/resume", payload, {
          headers: {
            "Content-Type": "text/plain",
          },
        });
      }
  
      setGeneratedResume(response.data.resume);
      setCoverLetter(response.data.coverLetter);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }
  
  

  function handleChange(event) {
    setUserResume(event.target.value);
  }

  function handleJobDescriptionChange(event) {
    setJobDescription(event.target.value);
  }

  function handleInputTypeChange(event) {
    setInputType(event.target.value);
  }

  const handleFileUpload = (event) => {
    setPDFFile(event.target.files[0]);
  };

  return (
    <Container maxWidth="md">
      {!loading ? (
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
          <Typography sx={{mt: 4}}>Perfection takes time! Lean back and let us do the hard part.</Typography>
        </Box>
      )}
      <Box sx={{ width: "100%", textAlign: "left", mt: 4 }}>
        <ReactMarkdown>{generatedResume}</ReactMarkdown>
        <ReactMarkdown>{coverLetter}</ReactMarkdown>
      </Box>
    </Container>
  );
}

export default DataEntry;
