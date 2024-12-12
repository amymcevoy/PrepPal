const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4000;

// connect to MongoDB using your provided connection string
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

app.get('/', (req, res) => {
    res.send('Hello, world!');
  });
  

//start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
