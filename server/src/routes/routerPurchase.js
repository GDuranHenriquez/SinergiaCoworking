const {Router} = require('express')
const postPurchase = require('../controllers/purchase/postPurchase')

const routerPurchase = Router()

routerPurchase.get("/", )
routerPurchase.post("/", postPurchase)
routerPurchase.delete("/", )

module.exports = routerPurchase