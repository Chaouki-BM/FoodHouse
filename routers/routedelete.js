const express = require('express')
const route = express.Router();
const mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/foodhouse'
const sproduct = mongoose.Schema({
    img: String,
    titel: String,
    description: String,
    price: Number
})
var product = mongoose.model('products', sproduct)
route.get('/product', (req, res, next) => {
    let promisprod = new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return product.find({})
        }).then((products) => {
            mongoose.disconnect()
            resolve(products)
        }).catch((err) => {
            reject(err)
        })
    })
    promisprod.then((products) => {
        res.render('delete', { products: products })
    });
})


route.get('/product/delete/:id', (req, res) => {
    let del = new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return product.findByIdAndDelete({ _id: req.params.id })
        }).then((id) => {
            if (id == null) {
                reject(' DocumentNotFoundError: null')
            } else {
                console.log(id)
                mongoose.disconnect()
                resolve('success')
            }

        }).catch((err) => {
            reject(err)
        })
    })
    del.then((verif) => {
        console.log(verif);
        res.redirect('/product')
    }).catch((err) => {
        console.log(err);
        res.redirect('/product')
    })
})

route.get('/sign_out', (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/signin')
    })

})





module.exports = route