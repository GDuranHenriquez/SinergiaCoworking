const {Router} = require('express')
const postBuilding = require('../controllers/building/postBuilding')
const getBuildings = require('../controllers/building/getBuildings')
const getBuildingById = require("../controllers/building/getBuildingById")
const updateBuilding = require('../controllers/building/updateBuilding')
const changeDeleteStatusBuilding = require('../controllers/building/changeDeleteStatusBuilding')

const routerBuilding = Router()

routerBuilding.get("/", getBuildings)
routerBuilding.get("/:id", getBuildingById)
routerBuilding.post("/", postBuilding)
routerBuilding.post("/change-status/:id", changeDeleteStatusBuilding)
routerBuilding.put("/", updateBuilding)

module.exports = routerBuilding