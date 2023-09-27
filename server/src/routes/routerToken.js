const { Router } = require('express');
const { postRefreshToken } = require('../controllers/token/postRefreshToken');

const tokenRouter = Router();

tokenRouter.post('/refresh-token', postRefreshToken);

module.exports = tokenRouter;
