const { getTokenFromHeader } = require("../token/getTokenFromHeader");
const { Token } = require('../../db');

async function deleteSingOut(req, res){
  try {
    const refreshToken = getTokenFromHeader(req.headers);
    if(refreshToken){
      const token = await Token.findOne({ where: { token: refreshToken } });
      if(token === null){
        return res.status(401).json({ message: 'Incorrect token' });
      };
      await token.destroy();
      return res.status(200).json({ message: 'Token deleted' });
    }

  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};

module.exports = { deleteSingOut };