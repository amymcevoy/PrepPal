const express = require('express');
const app = express();
const port = 4000;

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

//start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
