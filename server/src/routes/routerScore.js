const {Router} = require('express')

const routerScore = Router()

const postScore = require('../controllers/score/postScore')

routerScore.get("/", )
routerScore.post("/", postScore)
routerScore.delete("/", )

module.exports = routerScore