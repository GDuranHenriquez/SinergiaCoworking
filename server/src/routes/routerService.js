const {Router} = require('express')

const {getService} = require("../controllers/service/getService");
const {postServices} = require("../controllers/service/postService");
const {deleteService} = require("../controllers/service/deleteService");

const routerService = Router()

routerService.get("/", getService)
routerService.post("/", postServices)
routerService.delete("/:id", deleteService)

module.exports = routerService