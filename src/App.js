import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router

//components
import Home from './pages/Home'; // Import Home Page
import AddMeal from './pages/AddMeal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/add-meal" element={<AddMeal />} /> 
      </Routes>
    </Router>
  );
}

export default App;
