const express = require("express");
const mongoose = require("mongoose");
const route = express.Router();
var url = 'mongodb://localhost:27017/foodhouse'
var schemaprod = mongoose.Schema({
    img: String,
    titel: String,
    description: String,
    price: Number
})
var product = mongoose.model('product', schemaprod)
route.get("/menu", (req, res, next) => {
    let promiseProduct = new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return product.find({})
        }).then((products) => {
            mongoose.disconnect()
            resolve(products)
        }).catch(err => reject(err))
    })
    promiseProduct.then((products) => {
        res.render('menu', { products: products })
    })


});
module.exports = route