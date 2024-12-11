import React, { useState, useEffect } from 'react';

function MealList() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    // Retrieve saved meals from localStorage
    const storedMeals = JSON.parse(localStorage.getItem('meals')) || [];
    setMeals(storedMeals);
  }, []);

  return (
    <div className="meal-list-container">
      <h1>Saved Meals</h1>
      {meals.length === 0 ? (
        <p>No meals added yet. Please add a meal.</p>
      ) : (
        <ul>
          {meals.map((meal, index) => (
            <li key={index}>
              <strong>{meal.name}</strong>
              <p>{meal.ingredients}</p>
              <p>Calories: {meal.calories}</p>
              <p>{meal.instructions}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MealList;  // This should be the default export

