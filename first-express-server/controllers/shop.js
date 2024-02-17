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
};
// '/views/shop.html' is not a valid path because the '/' at the beginning searches the folder in our operating system so we need to add path to our project before searching for views folder 
//you travel from middleware to middleware using next() function. At the end of the last middleware you send a response, because you cannot send two res.send functions
//get function checks for the exact path also

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  })
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    const cartProducts = [];
    Product.fetchAll(products => {
      for (let product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        cart: cart,
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  })
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
};

/* using mysql database

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
   .then(([rows, fieldData]) => {
       res.render('shop/product-list', {
        prods: rows,
        pageTitle: 'All Products',
        path: '/products'
    });
   })
   .catch(err => { console.log(err) });
 };

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
   .then(([rows, fieldData]) => {
       res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/'
    });
   })
   .catch(err => { console.log(err) });
 }; 
 
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([product]) => {
      res.render('shop/product-detail', {
        product: product[0],
        pageTitle: product[0].title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
  }; 
*/

/* using sequelize

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
       prods: products,
       pageTitle: 'Shop',
       path: '/'
      });
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
       prods: products,
       pageTitle: 'All Products',
       path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  
  //either of the following two ways can be used:
  Product.findAll({where: { id: prod.id } })
  .then(products => {
      res.render('shop/product-detail', {
       product: products[0],
       pageTitle: products[0].title,
       path: '/products'
      });
    })
  .catch(err => console.log(err));
  //findAll returns an array

  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
       product: product,
       pageTitle: product.title,
       path: '/products'
      });
    })
  .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.render('shop/cart', {
           path: '/cart',
           pageTitle: 'Your Cart',
           products: cartProducts
          });
        })
    })
    .catch(err => console.log(err));
};
*/
