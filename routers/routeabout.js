const express = require('express')
const route = express.Router()
route.get("/about", (req, res, next) => {
    res.render("about");
});
module.exports = route