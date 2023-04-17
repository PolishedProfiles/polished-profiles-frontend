import { useState } from "react";
import axios from "axios";
import ReactMarkdown from 'react-markdown';


function DataEntry() {
  const [userResume, setUserResume] = useState();
  const [generatedResume, setGeneratedResume] = useState();
  const [inputType, setInputType] = useState("text");
  const [pdfFile, setPDFFile] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      let response;
      if (inputType === 'pdf') {
        const formData = new FormData();
        formData.append('resume', pdfFile);
        console.log('pdf', formData, 'file', pdfFile)
        response = await axios.post('http://localhost:3001/api/pdf', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
      } else {
        response = await axios.post('http://localhost:3001/api/resume', { resume: userResume }, {
          headers: {
            'Content-Type': 'text/plain',
          },
        });
      }
  
      console.log(response.data);
      setGeneratedResume(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  
  
  

  function handleChange(event) {
    setUserResume(event.target.value);
    console.log(userResume)
    setTimeout(() => {
      console.log(userResume);
    }, 500);
  }

  function handleInputTypeChange(event) {
    setInputType(event.target.value);
  }

  const handleFileUpload = (event) => {
    setPDFFile(event.target.files[0]);
  }

  return (
    <div className="ResumeEntry" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <form onSubmit={(event) => handleSubmit(event)} style={{ textAlign: 'center' }}>
        <label>
          Input Method
          <select
            value={inputType}
            onChange={handleInputTypeChange}
            style={{ marginLeft: "10px", marginBottom: "20px" }}
          >
            <option value="text">Enter as text</option>
            <option value="pdf">Enter as PDF</option>
          </select>
        </label>

        {inputType === "text" && (
          <div>
            <label>Input Info</label>
            <textarea
              style={{ width: "500px", height: "500px", display: "block", marginBottom: "20px" }}
              onChange={(event) => handleChange(event)}
            ></textarea>
          </div>
        )}

        {inputType === "pdf" && (
          <div>
            <label htmlFor="pdf">Upload PDF:</label>
            <input
              type="file"
              id="pdf"
              accept="application/pdf"
              style={{ display: "block", marginBottom: "20px" }}
              onChange={(event) => handleFileUpload(event)}
            />
          </div>
        )}

        <button>Generate</button>
      </form>
      <div style={{ width: "80%", textAlign: "left", marginTop: "20px" }}>
        <ReactMarkdown>{generatedResume}</ReactMarkdown>
      </div>
    </div>
  );
}

export default DataEntry;
