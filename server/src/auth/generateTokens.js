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
      email: data.email,
      type: data.accessLevel,
      imgUrl: data.imgUrl
  }
  return dataUser
};

module.exports = { generateAccessToken, generateRefreshToken, generateInfo }
