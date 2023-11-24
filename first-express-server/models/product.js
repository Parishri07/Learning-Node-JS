const fs = require('fs');

const path = require('path');
const rootDir = require('../utils/path');

const p = path.join(rootDir, 'data', 'products.json');

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        fs.readFile(p, (err, fileContent) =>  {
            let products = [];
            if(!err){
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        fs.readFile(p, (err, fileContent) => {
            if(err){
                cb([]);
            }
            cb(JSON.parse(fileContent));
        });
    }
    // static function can be called directly from the class without creating an instance of the class, to display all the elements of the products array we dont need to make a dummy object then call this function

};