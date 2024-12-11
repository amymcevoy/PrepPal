import React from 'react';
import { Link } from 'react-router-dom'; // navigation between pages

function Home() {
  return (
    <div>
      <h1>Welcome to PrepPal!</h1>

      <Link to="/add-meal">
        <button>Add a New Meal</button> 
      </Link>

    </div>
  );
}

export default Home;
