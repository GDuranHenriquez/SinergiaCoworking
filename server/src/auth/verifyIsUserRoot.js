require('dotenv').config();
const { HOST_EMPRESA } = process.env;

function VerifyIsRoot(email){
  const isRoot = email.includes(HOST_EMPRESA);
  if(isRoot){
    return true
  }
  return false
}

module.exports = { VerifyIsRoot };