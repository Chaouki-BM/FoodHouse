// import expressjs
const express = require("express")
const app = express()
// import path
const path = require("path")
// EJS
app.set("view engine", "ejs")
app.set("views", "views")
// static filder
app.use(express.static(path.join(__dirname, "assets")))

const routesingin = require('./routers/routesingin')
const routemenu = require('./routers/routemenu')
const routecontact = require('./routers/routecontact')
const routehome = require('./routers/routehome')
const routeabout = require('./routers/routeabout')
const routeexpert = require('./routers/routeexpert')
const routeadd = require('./routers/routeadd')
const routedelete = require('./routers/routedelete')
app.use(routesingin)
app.use(routemenu)
app.use(routecontact)
app.use(routehome)
app.use(routeabout)
app.use(routeexpert)
app.use(routeadd)
app.use(routedelete)

app.listen(5000, () => console.log("serveur run || port 5000 !"));