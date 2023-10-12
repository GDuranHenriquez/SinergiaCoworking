const {Router} = require('express')
const postPurchase = require('../controllers/purchase/postPurchase')
const getAllPurchase = require('../controllers/purchase/getAllPurchase')

const routerPurchase = Router()

routerPurchase.get("/:user", getAllPurchase)
routerPurchase.post("/", postPurchase)
routerPurchase.delete("/", )

module.exports = routerPurchase