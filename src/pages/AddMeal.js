import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';  //for http requests

function AddMeal() {

  // for form inputs
  const [meal, setMeal] = useState({
    name: '',
    ingredients: '',
    calories: '',
    instructions: '',

  });

  const [submitted, setSubmitted] = useState(false); //track if meal is submitted or not
  const navigate = useNavigate();

  // deal with changes to form 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeal((prevMeal) => ({
      ...prevMeal,
      [name]: value,
    }));
  };

  // form submission
  const handleSubmit = (e) => {
    e.preventDefault();

      // form validation
      if (!meal.name || !meal.ingredients || !meal.calories || !meal.instructions) {
        alert('Please fill in all fields');
        return; // Stop if fields are empty
      }

      if (meal.calories <= 0) {
        alert('Calories must be a positive number');
        return; 
      }

    //send data to the backend API using Axios
    axios.post('http://localhost:4000/api/meals', meal)
      .then((response) => {
        console.log(response.data); //logs response
        setMeal({
          name: '',
          ingredients: '',
          calories: '',
          instructions: '',
        });
        setSubmitted(true);
      })
      .catch((error) => {
        console.error('Error adding meal:', error);
      });
  };
  
  const handleBack = () => {
    navigate(-1); //brings you back a page
  };

  return (
    <div className="form-container">
      {/* Form to add new meal */}
      <h1>Add a New Meal</h1>
      <button className="back-btn" onClick={handleBack}>Back</button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={meal.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Ingredients</label>
          <input
            type="text"
            name="ingredients"
            value={meal.ingredients}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Calories</label>
          <input
            type="number"
            name="calories"
            value={meal.calories}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Instructions</label>
          <textarea
            name="instructions"
            value={meal.instructions}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit Meal</button>
      </form>
      
      <Link to="/meal-list">
          <button className="secondary-button">Meal List</button> 
      </Link>

      {submitted && (
        <p style={{ color: 'white', textAlign: 'center', marginTop: '10px' }}>
          Meal added successfully!
        </p>
      
      )}
    </div>
  );
}

export default AddMeal;
