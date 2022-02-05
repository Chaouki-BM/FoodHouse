const express = require("express");
const route = express.Router();
const body = express.urlencoded({ extended: true })

const mongoose = require('mongoose');

var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/foodhouse',
    collection: 'mySessions'
});
route.use(session({
    secret: '_ts',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true
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
            return User.find(getsingin)
        }).then((user) => {
            console.log(user);
            if (user.length == 0) {

                return res.render('signin', { err: 'this user not found try to check your name or password' })

            } else {
                mongoose.disconnect()
                res.redirect('add')
                resolve(user[0].id)
                req.session.userid = user[0].id

            }
        })
    })
    newpromis.then((id) => {
        console.log(id);
        console.log(req.session);

    }).catch((err) => {
        console.log(err);
    })
})
module.exports = route