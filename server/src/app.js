const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config()
const {REQUEST_URL} = process.env

//swagger
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./docsSwagger/openapi.json');
const { authenticate } = require('./auth/athenticate');

//Import All Routes.
const routerCart = require('./routes/routerCart')
const routerCategory = require('./routes/routerCategory')
const routerCity = require('./routes/routerCity')
const routerBuilding = require('./routes/routerBuilding')
const routerOffice = require('./routes/routerOffice')
const routerProvince = require('./routes/routerProvince')
const routerPurchase = require('./routes/routerPurchase')
const routerScore = require('./routes/routerScore')
const routerService = require('./routes/routerService')
const routerToken = require('./routes/routerToken');
const routerUser = require('./routes/routerUser')
const routerLoginRegister = require('./routes/routerLoginRegister');
const routerDataUserClient = require('./routes/routerProtecteDateUser');
const routerUpdateUser = require('./routes/routerUpdateUser');
const routerAdminChart = require('./routes/routerAdminChart')

require('./db.js');

const server = express();

server.name = 'API WELLNEST CLINIC';

//middlewares
server.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
server.use(bodyParser.json({ limit: '100mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', REQUEST_URL);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
server.use(cors());
server.use(express.json());

//server.use('/', routes);
server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
server.use('/update-user', authenticate, routerUpdateUser);
server.use('/data-user', authenticate, routerDataUserClient);

//tokens
server.use('/cart', routerCart);
server.use('/category', routerCategory);
server.use('/admin-chart', routerAdminChart)
server.use('/city', routerCity);
server.use('/building', routerBuilding)
server.use('/office', routerOffice);
server.use('/province', routerProvince);
server.use('/purchase', routerPurchase);
server.use('/score', routerScore);
server.use('/service', routerService);
server.use('/token', routerToken);
server.use('/user', routerUser);
server.use('/sign-in-out', routerLoginRegister);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;