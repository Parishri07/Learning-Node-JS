const express = require('express');

const routes = express.Router();

routes.get('/add-product', (req, res, next) =>{
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></input></form>');
    // next(); //Allows the request to continue in the next middleware in line
})

routes.post('/product', (req, res, next) =>{
    console.log(req.body);
    res.redirect('/');
})

module.exports = routes;