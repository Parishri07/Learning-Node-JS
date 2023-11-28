const fs = require('fs');

const path = require('path');
const rootDir = require('../utils/path');

const p = path.join(rootDir, 'data', 'cart.json');

const getProductsFromCart = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb({ products: [], totalPrice: 0 });
        }
        cb(JSON.parse(fileContent));
    })
}

module.exports = class Cart {
    static addProduct(id, productPrice) {
        //Fetch the previous cart
        getProductsFromCart(cart => {
            //Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            if (existingProduct) {
                //if there is an existing product with the same id, then we make a new variable of updated product where we copy the existing product and add 1 to quantity 
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;

                //then we modify the existing product to the updated one 
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                //we make a new var of updated product with same id and qty as 1 and we add it to the cart products
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            //by adding + sign in front of productPrice the string value gets converted to number

            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        })
    }

    static fetchCart(cb){
        getProductsFromCart(cb);
    }
}