const {Router} = require('express')

const {getUser} = require("../controllers/user/getUser");
const {getUserById} = require("../controllers/user/getUserById");
const {postUser} = require("../controllers/user/postUser");
const {updateUser} = require("../controllers/user/updateUser");
const {deleteUser} = require("../controllers/user/deleteUser");

const routerUser = Router()

routerUser.get("/", getUser);
routerUser.get("/:id", getUserById);
routerUser.post("/", postUser);
routerUser.put("/:id", updateUser);
routerUser.delete("/:id", deleteUser)

module.exports = routerUser