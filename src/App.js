import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './Components/LandingPage';
import Navbar from './Components/Navbar';
import DataEntry from './Components/ResumeEntry';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/history' element={<h1> History </h1>} />
          <Route path='/about' element={<h1> About </h1>} />
          <Route path='/login' element={<h1> Login </h1>} />
          <Route path='/App' element={<DataEntry />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
