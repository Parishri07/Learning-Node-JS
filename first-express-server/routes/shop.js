const path = require('path');

const express = require('express');

// const rootDir = require('../utils/path');

const shopControllers = require('../controllers/shop');

const router = express.Router();

router.get('/', shopControllers.getIndex);

router.get('/products', shopControllers.getProducts);

// router.get('/products/delete');

router.get('/products/:productId', shopControllers.getProduct);
//this enables us to extract and use the productId  
//: enables us to write a dynamic segment

router.get('/cart', shopControllers.getCart);

router.post('/cart', shopControllers.postCart);

router.post('/cart-delete-item', shopControllers.postCartDeleteProduct);

router.get('/orders', shopControllers.getOrders);

router.get('/checkout', shopControllers.getCheckout); 

module.exports = router;