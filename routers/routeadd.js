const express = require('express');
const mongoose = require('mongoose');
const route = express.Router()
const body = express.urlencoded({ extended: true })


var url = 'mongodb://localhost:27017/foodhouse'
var schemaprod = mongoose.Schema({
    _id: String,
    img: String,
    titel: String,
    description: String,
    price: Number
})
var product = mongoose.model('Product', schemaprod)

route.get("/add", (req, res, next) => {
    res.render("add");
});

route.post("/add", body, (req, res, next) => {
    let formprod = ({
        img: req.body.img,
        titel: req.body.titel,
        description: req.body.description,
        price: req.body.price,
    })
    mongoose.connect(url).then(() => {
        product.insertMany(formprod)
    })
    res.render('add')

})


module.exports = route