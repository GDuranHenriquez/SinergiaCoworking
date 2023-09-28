const {Router} = require('express')
const deleteOffice = require('../controllers/Office/deleteOffice')
const getAllOffices = require('../controllers/Office/getAllOffices')
const postOffice = require('../controllers/Office/postOffice')
const getOfficeById = require('../controllers/Office/getOfficeById')


const routerOffice = Router()

routerOffice.get("/", getAllOffices)
routerOffice.get("/:id", getOfficeById)
routerOffice.post("/", postOffice)
routerOffice.delete("/", deleteOffice)

module.exports = routerOffice