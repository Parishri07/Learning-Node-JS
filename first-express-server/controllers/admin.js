const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', 
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

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path:'/admin/products'
    });
  });
}