const {Router} = require('express')
const postProvince = require('../controllers/province/postProvince')
const getProvinces = require('../controllers/province/getProvinces')
const deleteProvince = require('../controllers/province/deleteProvince')


const routerProvince = Router()

routerProvince.get("/", getProvinces)
routerProvince.post("/", postProvince)
routerProvince.delete("/:id", deleteProvince)

module.exports = routerProvince