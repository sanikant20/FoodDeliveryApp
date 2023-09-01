global.food_items = require('./db');
(function callback(err, data, categoryData) {
  if (err) {
      console.log(err);
  } else {
    global.food_items = data;
    global.foodCategory = categoryData;
  }
});

const express = require("express");
const app = express();
const cors = require('cors')
const mongoDB = require('./db');

app.use(cors())
//Middleware
app.use(express.json());
app.use('/api', require('./Routes/Auth.js'));


//port to run server
app.listen(5000, () => {
    console.log("Server is running on port 5000.");
});
