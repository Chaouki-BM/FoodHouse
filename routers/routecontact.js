const express = require('express')
const route = express.Router()
route.get("/contact", (req, res, next) => {
    res.render("contact");
});
module.exports = route