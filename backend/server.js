const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4000;

// connect to MongoDB connection string
mongoose.connect('mongodb+srv://dbuser123:ZqEpDKNBn7!9@datarep.akdsg.mongodb.net/DataRep?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected'))
  .catch((err) => console.error('Error', err));

const cors = require('cors');
app.use(cors());

//enable for all requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//handles from data
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//requirements for meal model
const mealRequirements = new mongoose.Schema({
    name: String,
    ingredients: String,
    calories: Number,
    instructions: String
  });
  
//create a mealmodel
const Meal = mongoose.model('Meal', mealRequirements);

// create a meal
app.post('/api/meals', async (req, res) => {
    try {
      const { name, ingredients, calories, instructions } = req.body;
      const newMeal = new Meal({ name, ingredients, calories, instructions });
      await newMeal.save();
      res.status(201).json({ message: 'Meal added successfully', meal: newMeal });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
//get all meals
app.get('/api/meals', async (req, res) => {
    try {
      const meals = await Meal.find(); //fetch meals from database
      res.status(200).json({ meals });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.get('/', (req, res) => {
    res.send('Hello, world!');
  });
  
//start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
