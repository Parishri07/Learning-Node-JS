const path = require('path');

const express = require('express');

// const rootDir = require('../utils/path');

const adminControllers = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminControllers.getAddProduct);

// /admin/products => GET
router.get('/products', adminControllers.getProducts);

// /admin/edit-product => GET
router.get('/edit-product/:productId', adminControllers.getEditProduct);

// /admin/add-product => POST
router.post('/add-product', adminControllers.postAddProduct);

// /admin/edit-product => POST
router.post('/edit-product', adminControllers.postEditProduct);

router.post('/delete-product', adminControllers.postDeleteProduct);

module.exports = router;