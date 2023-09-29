const {Router} = require('express')
const deleteOffice = require('../controllers/Office/deleteOffice')
const getOffices = require('../controllers/Office/getOffices')
const postOffice = require('../controllers/Office/postOffice')
const getOfficeById = require('../controllers/Office/getOfficeById')


const routerOffice = Router()

routerOffice.get("/", getOffices)
routerOffice.get("/:id", getOfficeById)
routerOffice.post("/", postOffice)
routerOffice.delete("/:id", deleteOffice)

module.exports = routerOffice