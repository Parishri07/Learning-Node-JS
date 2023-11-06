const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');

const routes = express.Router();

routes.get('/', (req, res, next) =>{
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  // '/views/shop.html' is not a valid path because the '/' at the beginning searches the folder in our operating system so we need to add path to our project before searching for views folder 
})
 //you travel from middleware to middleware using next() function. At the end of the last middleware you send a response, because you cannot send two res.send functions
 //get function checks for the exact path also

module.exports = routes;
