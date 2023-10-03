const { Router } = require('express');
const { getDataUserClient } = require('../controllers/protectedUser/getDataUser');


const routerDataUserClient = Router();
routerDataUserClient.get('/', getDataUserClient);


module.exports = routerDataUserClient;