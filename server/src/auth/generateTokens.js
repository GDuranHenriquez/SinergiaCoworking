const jwt = require('jsonwebtoken');
const { SECRECT_KEY } = process.env;

function sign(payload, isAccessToken){
  return jwt.sign(payload, isAccessToken? process.env.ACCESS_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: 3600,
  })
};

function generateAccessToken(user){
  return sign({user}, true);
};

function generateRefreshToken(user){
  return sign({user}, false);
};

function generateInfo(data){
  const dataUser = {
      id: data.id,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      /* dni: data.dni,
      birthDate: data.birthDate,
      address: data.address,
      upToDate: data.upToDate,
      backupContact: data.backupContact,
      imageUrl: data.imageUrl,
      plan: data.plan,
      dniType: data.dniType */
  }
  return dataUser
};

module.exports = { generateAccessToken, generateRefreshToken, generateInfo }
