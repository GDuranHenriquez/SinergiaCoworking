const { getTokenFromHeader } = require('../controllers/token/getTokenFromHeader');
const { verifyAccessToken } = require('./verifyTokens');

function authenticate(req, res, next){
  const token = getTokenFromHeader(req.headers);
  
  if(token){
    const decoded = verifyAccessToken(token);
    if(decoded){
      req.user = {...decoded.user};
      next();      
    }else{
      return res.status(401).json({error: 'No token provided'});
    }
  }else{
   return res.status(401).json({error: 'No token provided'});
  }

};

module.exports = { authenticate };