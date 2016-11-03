// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var fs = require('fs');

//Models mongo db 
mongoose.connect('mongodb://localhost/rest_test');

// Express
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Controllers
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      app.use(file,  require ('./controllers/api'));      
  }
});

//Start server
app.listen(3000);
console.log("API is running port 3000");

