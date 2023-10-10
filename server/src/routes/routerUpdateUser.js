const { Router } = require('express');
const { updateUser } = require('../controllers/loginRegister/updateUser');


const routerUpdateUser = Router();
routerUpdateUser.put('/', updateUser);


module.exports = routerUpdateUser;