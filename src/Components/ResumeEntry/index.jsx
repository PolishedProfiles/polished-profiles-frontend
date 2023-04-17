import { useState } from "react";
import axios from "axios";


function DataEntry() {
  const [userResume, setUserResume] = useState();
  const [generatedResume, setGeneratedResume] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(userResume);
    try {
      let response = await axios.post('http://localhost:3001/api/resume', userResume, {
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      // axios.post('http://localhost:3001/api/resume', userResume);
      console.log(response.data);
      setGeneratedResume(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleChange(event) {
    setUserResume(event.target.value)
    setTimeout(() => {
      console.log(userResume);

    }, 500);

  }
  return (
    <div className='ResumeEntry' style={{ display: "flex" }}>
      <form onSubmit={(event) => handleSubmit(event)}>
        <label>Input Info
          <textarea style={{ width: '500px', height: '500px' }}
            onChange={(event) => handleChange(event)}>
          </textarea>
        </label>
        <button>
          Generate
        </button>
      </form>
      <p>
        {generatedResume}
      </p>
    </div>
  )
}

export default DataEntry;