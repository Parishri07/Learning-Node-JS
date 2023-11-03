const express = require('express');

const app = express();

app.use('/add-product', (req, res, next) =>{
    console.log("In middleware");
    res.send('<h1>This is Add Products Page</h1>');
    // next(); //Allows the request to continue in the next middleware in line
})

app.use('/', (req, res, next) =>{
    console.log("In another middleware");
    res.send('<h1>Hello.. Welcome to my express server</h1>');
    //you travel form middleware to middleware using next() function. At the end of the last middleware you send a response
})

app.listen(3000);
