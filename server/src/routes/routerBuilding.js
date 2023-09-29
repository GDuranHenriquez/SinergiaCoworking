const {Router} = require('express')
const postBuilding = require('../controllers/building/postBuilding')
const getBuildings = require('../controllers/building/getBuildings')
const deleteBuilding = require('../controllers/building/deleteBuilding')

const routerBuilding = Router()

routerBuilding.get("/", getBuildings)
routerBuilding.post("/", postBuilding)
routerBuilding.delete("/:id", deleteBuilding)

module.exports = routerBuilding