const express = require('express');

const routes = express.Router();

routes.get('/', (req, res, next) =>{
    res.send('<h1>Hello.. Welcome to my express server</h1>');
    //you travel from middleware to middleware using next() function. At the end of the last middleware you send a response
    //because you cannot send two res.send functions
})
//get function checks for the exact path also

module.exports = routes;