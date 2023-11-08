const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');
//Allows us to set a global configuration value and w could read them from app.get

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public'))); //access files statically

app.use('/admin',adminData.routes); //we are filtering that all paths starting from /admin should be checked in adminRoutes
app.use(shopRoutes);

app.use((req, res, next) =>{
    res.status(404).sendFile(path.join(__dirname, 'views', 'error-page.html')); 
})

app.listen(3000);
