const bcrypt = require('bcrypt');
require('dotenv').config();


const { CRSALT } = process.env;

async function encrypPass(pass){
  const salt = parseInt(CRSALT)
  let passEncrypt = await bcrypt.hash(pass, salt);
  return passEncrypt;

};

module.exports = { encrypPass };