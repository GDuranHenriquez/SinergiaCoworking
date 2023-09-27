const { generateAccessToken, generateRefreshToken, generateInfo } = require('./generateTokens');
const { Token } = require('../db');

function createAccessToken(data){
  return generateAccessToken(generateInfo(data));
};

async function createRefreshToken(data){
  const refreshToken = generateRefreshToken(generateInfo(data));
  try {
    await Token.create({token:refreshToken});
    return refreshToken;
  } catch (error) {
    return {error: error.message};
  };
};

module.exports = { createAccessToken,  createRefreshToken }