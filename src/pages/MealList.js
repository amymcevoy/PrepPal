import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

function MealList() {
  const [meals, setMeals] = useState([]);
  const [editIndex, setEditIndex] = useState(null); 
  const [editMeal, setEditMeal] = useState({})

  useEffect(() => {
    // Retrieve saved meals from localStorage
    const storedMeals = JSON.parse(localStorage.getItem('meals')) || [];
    setMeals(storedMeals);
}, []);
    
const navigate = useNavigate();

    //delete a meal
    const handleDelete = (index) => {
        const updatedMeals = [...meals];
        updatedMeals.splice(index, 1); //remove meal at specified index
        setMeals(updatedMeals);
        localStorage.setItem('meals', JSON.stringify(updatedMeals)); //update localStorage
    };

    //edit a meal
    const handleEdit = (index) => {
        setEditIndex(index);
        setEditMeal({ ...meals[index] }); 
    };

    //change meal after edited
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditMeal((prevMeal) => ({
        ...prevMeal,
        [name]: value,
     }));
    };
   
    //save meal after changed
    const handleSave = () => {
    const updatedMeals = [...meals];
    updatedMeals[editIndex] = editMeal; //replace old meal with new one
    setMeals(updatedMeals);
    localStorage.setItem('meals', JSON.stringify(updatedMeals));
    setEditIndex(null); //exit editing
    };

    // Back button function
    const handleBack = () => {
    navigate(-1);  // Navigate back to the previous page
    };

    return (
        <div className="meal-list-container">
          <h1>Saved Meals</h1>
          <button onClick={handleBack}>Back</button>
          {meals.length === 0 ? (
            <p>No meals added yet. Please add a meal.</p>
          ) : (
            <ul>
              {meals.map((meal, index) => (
                <li key={index}>
                  {editIndex === index ? (
                    <div>
                      {/* Editable fields */}
                      <input
                        type="text"
                        name="name"
                        value={editMeal.name}
                        onChange={handleChange}
                        required
                      />
                      <input
                        type="text"
                        name="ingredients"
                        value={editMeal.ingredients}
                        onChange={handleChange}
                        required
                      />
                      <input
                        type="number"
                        name="calories"
                        value={editMeal.calories}
                        onChange={handleChange}
                        required
                      />
                      <textarea
                        name="instructions"
                        value={editMeal.instructions}
                        onChange={handleChange}
                        required
                      />
                      <button onClick={handleSave}>Save</button> {/* Save button */}
                    </div>
                  ) : (
                    <div>
                      {/* Display meal info */}
                      <strong>{meal.name}</strong>
                      <p>{meal.ingredients}</p>
                      <p>Calories: {meal.calories}</p>
                      <p>{meal.instructions}</p>
                      <button onClick={() => handleEdit(index)}>Edit</button> {/* Edit button */}
                      <button onClick={() => handleDelete(index)}>Delete</button> {/* Delete button */}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }
    
export default MealList;
