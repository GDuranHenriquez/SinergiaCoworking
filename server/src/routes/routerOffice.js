const {Router} = require('express')
const getOffices = require('../controllers/office/getOffices')
const postOffice = require('../controllers/office/postOffice')
const getOfficeById = require('../controllers/office/getOfficeById')
const availabilityCheck = require('../controllers/office/availabilityCheck')
const updateOffice = require('../controllers/office/updateOffice')
const changeDeleteStatusOffice = require('../controllers/office/changeDeleteStatusOffice')
const checkSpace = require('../controllers/office/checkSpace')

const routerOffice = Router()

routerOffice.get("/", getOffices)
routerOffice.get("/check-space", checkSpace)
routerOffice.get("/:id", getOfficeById)
routerOffice.post("/availability-check", availabilityCheck)
routerOffice.post("/", postOffice)
routerOffice.post("/change-status/:id", changeDeleteStatusOffice)
routerOffice.put("/", updateOffice)

module.exports = routerOffice