require('dotenv').config();
const { Sequelize } =require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_PORT,DB_NAME
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  define: {
    freezeTableName: true,
  },
  logging: false,
  native: false,
  
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);


sequelize.models = Object.fromEntries(capsEntries);

const {
  Cart,
  Category,
  City,
  DetailPurchase,
  Office,
  OfficeImage,
  Province,
  Purchase,
  Score,
  Service,
  Unavailability,
  User
} = sequelize.models;

Purchase.belongsTo(User, {as: 'user_purchase', foreignKey: 'user'})
Purchase.hasMany(DetailPurchase, {as: 'purchase_detailPurchase', foreignKey: 'purchase'})
DetailPurchase.belongsTo(Office, {as: 'detailPurchase_office', foreignKey:'office'})
User.hasOne(Cart, {as: 'user_cart', foreignKey: 'user'})
Score.belongsTo(User, {as: 'user_score', foreignKey: 'user'})
Score.belongsTo(Office, {as: 'office_score', foreignKey: 'office'})
Office.hasMany(OfficeImage, {as: 'office_officeImage', foreignKey: 'office'})
Office.hasMany(Unavailability, {as: 'office_unavailability', foreignKey: 'office'})
Office.belongsTo(Category, {as: 'office_category', foreignKey: 'category'})
Office.belongsTo(City, {as: 'office_city', foreignKey: 'city'})
City.belongsTo(Province, {as: 'city_province', foreignKey: 'province'})
Cart.belongsToMany(Office, {through: 'cart_office', foreignKey: 'cart'})
Office.belongsToMany(Cart, {through: 'cart_office', foreignKey: 'office'})
Office.belongsToMany(Service, {through: 'office_service', foreignKey: 'office'})
Service.belongsToMany(Office, {through: 'office_service', foreignKey: 'service'})

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};