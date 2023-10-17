const jwt  = require('jsonwebtoken');

function verifyAccessToken(token){
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
};

function verifyRefreshToken(token){
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
};

function decodeToken(token){
  const decodedToken = jwt.decode(token);
  return decodedToken;
}

module.exports = { verifyAccessToken, verifyRefreshToken, decodeToken }