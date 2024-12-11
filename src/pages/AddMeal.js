import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

       //saves meal in local storage ( used geeksforgeeks for help with all local storage)
       const storedMeals = JSON.parse(localStorage.getItem('meals')) || [];
       storedMeals.push(meal);
       localStorage.setItem('meals', JSON.stringify(storedMeals));

      // reset form and show success message
      setMeal({
        name: '',
        ingredients: '',
        calories: '',
        instructions: '',

      });

      setSubmitted(true);

      // reset success message
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
  };

    // Back button function
    const handleBack = () => {
      navigate(-1);  // Navigate back to the previous page
    };

  return (
    <div  className="add-meal-container">

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

    {/* shows success message after form submission */}
      {submitted && (
        <p style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>
          Meal added successfully!
        </p>
      
      )}
    </div>
  );
}

export default AddMeal;
