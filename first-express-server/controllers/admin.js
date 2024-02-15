const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product',
    {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false
      // formsCSS: true,
      // productCSS: true,
      // activeAddProduct: true
    })
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  // next(); //Allows the request to continue in the next middleware in line
}
// res.render function is used to insert a template. First it looks for the view engine and then inserts the file name given as the first parameter as the template

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save(() => {
    res.redirect('/');
  });
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  //we can access the query parameters by using req.query, query parameters are passed in url after ? and are key value pairs. Query paramters are generally used for keeping some of the filters user enters
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    })
  })
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
  updatedProduct.save(() => {
    res.redirect('/admin/products');
  });
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deletebyId(prodId, () => {
    res.redirect('/admin/products');
  });
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
}

/* using mysql database

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save()
   .then(() => {
    res.redirect('/');
    })
    .catch(err => console.log(err));
} 
*/

/* using sequelize
   
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
    .then(() => {
      res.redirect('/');
    })
    .catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  //we can access the query parameters by using req.query, query parameters are passed in url after ? and are key value pairs. Query paramters are generally used for keeping some of the filters user enters
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId) 
    .then(product => {
      if (!product) {
        res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      })
    })
    .catch(err => console.log(err));
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  Product.findById(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then(() => {
      res.redirect('/admin/products');  
    })
    .catch(err => console.log(err) );
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findbyId(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err) );
  });
}
*/
