import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import './App.css';
import LandingPage from './Components/LandingPage';
import Navbar from './Components/Navbar';
import DataEntry from './Components/ResumeEntry';
import History from './Components/History';
import About from './Components/About';



const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});


function App() {
const [modalResume, setModalResume] = useState(false);
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          
          <Route path='/history' element={<History modalResume={modalResume} setModalResume={setModalResume} />} />
          <Route path='/about' element={<About />} />      
          <Route path='/App' element={<DataEntry setModalResume={setModalResume} />} />
          
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
