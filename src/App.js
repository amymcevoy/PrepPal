import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router

//components
import Home from './pages/Home'; // Import Home Page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  
      </Routes>
    </Router>
  );
}

export default App;
