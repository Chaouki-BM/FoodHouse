const express = require('express')
const route = express.Router()
route.get("/", (req, res, next) => {
    // res.send('welcome back')
    res.render("index");
});
module.exports = route