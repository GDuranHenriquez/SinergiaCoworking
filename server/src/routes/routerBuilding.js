const {Router} = require('express')
const postBuilding = require('../controllers/building/postBuilding')
const getBuildings = require('../controllers/building/getBuildings')
const deleteBuilding = require('../controllers/building/deleteBuilding')
const getBuildingById = require("../controllers/building/getBuildingById");

const routerBuilding = Router()

routerBuilding.get("/", getBuildings)
routerBuilding.get("/:id", getBuildingById)
routerBuilding.post("/", postBuilding)
routerBuilding.delete("/:id", deleteBuilding)

module.exports = routerBuilding