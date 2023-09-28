const {Router} = require('express')

const routerCity = Router()

const {getCity} = require("../controllers/city/getCity");
const {postCity} = require("../controllers/city/postCity");
const {deleteCity} = require("../controllers/city/deleteCity")

routerCity.get("/", getCity);
routerCity.post("/", postCity);
routerCity.delete("/:id", deleteCity);

module.exports = routerCity