const express = require("express");
const route = express.Router();
const body = express.urlencoded({ extended: true })

const mongoose = require('mongoose');

// import express-session
const mysession = require("express-session");

const mongodbstor = require('connect-mongodb-session')(mysession)
//connect mdb
var store = mongodbstor({
    uri: 'mongodb://localhost:27017/foodhouse',
    Collection: 'mysession'
});
//connect
route.use(mysession({
    secret: 'secret key is chaouki',
    cookie: {
        maxAge: 1000 * 60 * 60 //1h
    },
    store: store,
    resave: true,
    saveUninitialized: true,
}));



route.get('/signin', (req, res, next) => {
    res.render('signin')
});



var url = 'mongodb://localhost:27017/foodhouse'
let Schemauser = mongoose.Schema({
    _id: Object,
    name: String,
    password: String
});
var User = mongoose.model('user', Schemauser);
route.post('/signin', body, (req, res, next) => {
    let getsingin = {
        name: req.body.name,
        password: req.body.password,
    };

    var newpromis = new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return User.find({ getsingin })
        }).then((user) => {
            if (user.length == 0) {

                return res.render('signin', { err: 'this user not found try to check your name or password' })

            } else {
                mongoose.disconnect()
                res.redirect('add')
                resolve(user[0]._id)
            }
        })
    })
    newpromis.then((id) => {
        console.log(id)
        req.session.userId = id
    }).catch((err) => {
        console.log(err);
    })
})
module.exports = route