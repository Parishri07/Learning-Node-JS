const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', 
    { 
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    // next(); //Allows the request to continue in the next middleware in line
}
// res.render function is used to insert a template. First it looks for the view engine and then inserts the file name given as the first parameter as the template

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
}

exports.shopPage = (req, res, next) => {
    Product.fetchAll(products =>{
      res.render('shop', { 
        prods: products, 
        pageTitle: 'Shop', 
        path: '/', 
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true 
      });
      // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    });
  }
  // '/views/shop.html' is not a valid path because the '/' at the beginning searches the folder in our operating system so we need to add path to our project before searching for views folder 
//you travel from middleware to middleware using next() function. At the end of the last middleware you send a response, because you cannot send two res.send functions
//get function checks for the exact path also