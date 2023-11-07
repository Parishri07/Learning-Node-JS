const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');

const routes = express.Router();

const products = [];

// /admin/add-product => GET
routes.get('/add-product', (req, res, next) =>{
     res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    // next(); //Allows the request to continue in the next middleware in line
})

// /admin/add-product => POST
routes.post('/add-product', (req, res, next) =>{
    products.add({title: req.body.title});
    res.redirect('/');
})

exports.routes = router;
exports.products = products;
