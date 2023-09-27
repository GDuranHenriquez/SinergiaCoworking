const { getTokenFromHeader } = require('./getTokenFromHeader');
const { Token } = require('../../db');
const { verifyAccessToken, verifyRefreshToken } = require('../../auth/verifyTokens');
const { generateAccessToken } = require('../../auth/generateTokens');


async function postRefreshToken(req, res){
  try {
    const refreshToken = getTokenFromHeader(req.headers);
    if(refreshToken){
      const found = await Token.findOne({ where: {token: refreshToken}});      
      if(!found){
        return res.status(401).json({error: "Unauthorized"});
      }
      const payload = verifyRefreshToken(found.dataValues.token);
      if(payload){
        const accessToken = generateAccessToken(payload.user)
        return res.status(200).json({accessToken: accessToken});
      }else{
        return res.status(401).json({error: "Unauthorized"});
      }
    }else{
      res.status(401).json({error: "Unauthorized"});
    }
  } catch (error) {
    res.status(401).json({error: error.message});
  }
}

module.exports = { postRefreshToken };