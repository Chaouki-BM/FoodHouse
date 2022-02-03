const express = require('express')
const route = express.Router()

route.get("/expert", (req, res, next) => {
    res.render("expert");
});
module.exports = route