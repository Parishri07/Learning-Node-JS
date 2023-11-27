const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
      // hasProducts: products.length > 0,
      // activeShop: true,
      // productCSS: true 
    });
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  });
}
// '/views/shop.html' is not a valid path because the '/' at the beginning searches the folder in our operating system so we need to add path to our project before searching for views folder 
//you travel from middleware to middleware using next() function. At the end of the last middleware you send a response, because you cannot send two res.send functions
//get function checks for the exact path also

exports.getProduct = (req, res, next) =>{
   const prodId = req.params.productId;
   Product.findById(prodId, product => {
    res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
    });
   })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart'
    });
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
     Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
  res.render('shop/cart', {
    path: '/orders',
    pageTitle: 'Your Orders'
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}

