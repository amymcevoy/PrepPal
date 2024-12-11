import React, { useState } from 'react';

function AddMeal() {

  // for form inputs
  const [meal, setMeal] = useState({
    name: '',
    ingredients: '',
    calories: '',
    instructions: '',
  });

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
    console.log(meal);
  };

  return (
    <div>
      <h1>Add a New Meal</h1>
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
    </div>
  );
}

export default AddMeal;
