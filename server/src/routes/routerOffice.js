const {Router} = require('express')
const deleteOffice = require('../controllers/office/deleteOffice')
const getOffices = require('../controllers/office/getOffices')
const postOffice = require('../controllers/office/postOffice')
const getOfficeById = require('../controllers/office/getOfficeById')
const availabilityCheck = require('../controllers/office/availabilityCheck')


const routerOffice = Router()

routerOffice.get("/", getOffices)
routerOffice.get("/:id", getOfficeById)
routerOffice.get("/check-date", availabilityCheck)
routerOffice.post("/", postOffice)
routerOffice.delete("/:id", deleteOffice)

module.exports = routerOffice