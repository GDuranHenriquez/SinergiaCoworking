const {Router} = require('express')
const getChartInfo = require('../controllers/adminChart/getChartInfo')

const routerAdminChart = Router()

routerAdminChart.get("/", getChartInfo)


module.exports = routerAdminChart