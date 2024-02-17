const express = require('express');
const bodyParser = require('body-parser');

const expressHbs = require('express-handlebars');

const path = require('path');

const errorController = require('./controllers/error.js');
// const sequelize = require('./utils/database');
const Product = require('./models/product.js');
const User = require('./models/user.js');
const Cart = require('./models/cart.js');
const CartItem = require('./models/cart-item.js');

const app = express();

//Allows us to set a global configuration value and we could read them from app.get
// app.set('view engine', 'pug');
//for pug we dont need to install any additional packages and we use app.set because pug is a built in engine

// app.engine(
//     'hbs', 
//     expressHbs({
//         layoutsDir: 'views/layouts/', 
//         defaultLayout: 'main-layout',
//         extname: 'hbs'
//     })
// );
// app.set('view engine', 'hbs');
//for express handlers we need to install the packages separately by   npm install --save express-handlebars@3.0 and require it also since it is not built in we use app.engine before app.set
//for handlebars page extension will be as we have specified above in app engine for this case it is hbs

app.set('view engine', 'ejs');

app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

/* db.execute('SELECT * FROM products')
   .then((value) => {
    console.log(value);
   })
   .catch((err) => {
    console.log(err);
   }); */

app.use(bodyParser.urlencoded({ extended: false }));
// If extended is set to false, the values are represented as strings or arrays. If extended is set to true, the values can be any type and are represented as objects.
app.use(express.static(path.join(__dirname, 'public'))); //access files statically

// app.use((req, res, next) => {
//   User.findById(1)
//    .then(user => {
//     req.user = user;
//     next();
//    })
//    .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes); //we are filtering that all paths starting from /admin should be checked in adminRoutes
app.use(shopRoutes);


app.use(errorController.get404);

//Associations or relationships
// Product.belongsTo(User, {
//   constraints: true,
//   onDelete: 'CASCADE'
// });
// User.hasMany(Product);
//product will have a userId column

User.hasOne(Cart);
Cart.belongsTo(User);
//Cart will have a userId column

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });


// sequelize
//   .sync() 
//   .then((result) => {
//     return User.findById(1)
//   })
//   .then(user => {
//     if(!user){
//       return User.create({ name:'Kartik Aaryan', email: 'jfrvuiose.com'})
//     }
//     return user;
//   })
//   .then(user => {
//     return user.createCart();
//   })
//   .then(cart => {
//     app.listen(3000);
//   })
//   .catch(err => console.log(err));
// it syncs the models to the database by creating appropiate tables
// .sync({ force: true }) -> here it deletes the existing table if any and creates new one 
app.listen(3000);
