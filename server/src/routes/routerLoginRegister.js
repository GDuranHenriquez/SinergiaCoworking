const {Router} = require('express');
const { postLoginUser } = require('../controllers/loginRegister/loginUser');
const { postRegisterAcountUser } = require('../controllers/loginRegister/postRegister');
const { deleteSingOut } = require('../controllers/loginRegister/singOut');


const routerLoginRegister = Router();

routerLoginRegister.post('/login', postLoginUser);
routerLoginRegister.post('/register-user', postRegisterAcountUser);
routerLoginRegister.delete('/sign-out', deleteSingOut)

module.exports = routerLoginRegister;