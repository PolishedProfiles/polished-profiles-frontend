import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import './App.css';
import LandingPage from './Components/LandingPage';
import Navbar from './Components/Navbar';
import DataEntry from './Components/ResumeEntry';
import History from './Components/History';


const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});


function App() {

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<LandingPage />} />

          <Route path='/history' element={<History />} />
          <Route path='/about' element={<h1> About </h1>} />
          <Route path='/login' element={<h1> Login </h1>} />
          <Route path='/App' element={<DataEntry />} />

        </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
