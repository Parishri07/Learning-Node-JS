const path = require('path');

const express = require('express');

// const rootDir = require('../utils/path');

const productControllers = require('../controllers/products');

const routes = express.Router();

routes.get('/', productControllers.shopPage);

module.exports = routes;
