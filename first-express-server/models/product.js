const fs = require('fs');

const path = require('path');
const rootDir = require('../utils/path');

const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if(err){
            cb([]);
        }
        cb(JSON.parse(fileContent));
    });
}

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile( products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        })
    }

    static fetchAll(cb) {
       getProductsFromFile(cb);
    }
    // static function can be called directly from the class without creating an instance of the class, to display all the elements of the products array we dont need to make a dummy object then call this function
};
