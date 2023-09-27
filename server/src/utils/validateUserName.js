const { UserClient, UserAdmin } = require('../db');

async function validateUserName(username){
    const isValidUserName = await UserClient.findOne({ where: { emailRegister: username } });
    if(isValidUserName === null){
      return true;
    }else{
      return false;
    }
};

async function validateUserNameAdmin(username){
  const isValidUserName = await UserAdmin.findOne({ where: { email : username } });
  if(isValidUserName === null){
    return true;
  }else{
    return false;
  }
};

module.exports = { validateUserName, validateUserNameAdmin }