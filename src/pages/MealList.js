import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

function MealList() {
  const [meals, setMeals] = useState([]);
  const [editIndex, setEditIndex] = useState(null); 
  const [editMeal, setEditMeal] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    //fetch meals from backend
    axios.get('http://localhost:4000/api/meals')
    .then(response => {
      setMeals(response.data.meals); //set meals from the backend
    })
    .catch(error => {
      console.error('Error fetching meals:', error);
    });
}, []);
    
    //delete a meal
    const handleDelete = (index) => {
        const mealToDelete = meals[index];
        console.log(`Deleting meal with ID: ${mealToDelete._id}`);//check if deletion is working

        axios.delete(`http://localhost:4000/api/meals/${mealToDelete._id}`)
          .then(() => {
            const updatedMeals = meals.filter((_, i) => i !== index); //remove deleted mea
            setMeals(updatedMeals); //update
          })
          .catch(error => {
            console.error('Error deleting meal:', error);
          });
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
    updatedMeals[editIndex] = editMeal; //update edited meal in array

        //update meal in backend
        axios.put(`http://localhost:4000/api/meals/${editMeal._id}`, editMeal)
        .then(() => {
          setMeals(updatedMeals); //update meals
          setEditIndex(null); //exit editing
        })
        .catch(error => {
          console.error('Error saving meal:', error);
        });
    };

    // Back button function
    const handleBack = () => {
    navigate(-1);  // Navigate back to the previous page
    };

    return (
        <div className="meal-list-container">
          <h1>Saved Meals</h1>
          <button className="back-btn" onClick={handleBack}>Back</button>
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
