const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const rootDir = require('../utils/path');
const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        }
        cb(JSON.parse(fileContent));
    });
}

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(cb) {
        getProductsFromFile(products => {
            if (this.id) {
                const exisitingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[exisitingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        })
        cb();
    }

    static deletebyId(id, cb){
        getProductsFromFile(products => {
           const product = products.find(prod => prod.id === id);
           if(!product){
            return;
           } 
           const updatedProducts = products.filter(prod => prod.id !== id);
           fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
            if(!err){
                Cart.deleteProduct(id, product.price);
            }
           }) 
        })
        cb();
    };

    static fetchAll(cb) {
        getProductsFromFile(cb);
    };
    // static function can be called directly from the class without creating an instance of the class, to display all the elements of the products array we dont need to make a dummy object then call this function

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id.toString() === id.toString());
            if (!product) {
                return cb(null);
            }
            cb(product);
        });
    };
};

/* reaching out to the mysql database rather than local file

const db = require('../utils/database');

const Cart = require('./cart');

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)', [this.title, this.price, this.imageUrl, this.description])
    }

    static deletebyId(id){
    };

    static fetchAll(){
        return db.execute('SELECT * FROM products')
    };

    static findById(id){
        return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);    
    };
}; */

/* using sequelize

const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING, 
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    }
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Product;

//creating a model, second argument defines the structure
*/
