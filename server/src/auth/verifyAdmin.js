const { verifyRefreshToken } = require('./verifyTokens');
const {UserAdmin} = require('../db')

async function verifyAdmin(token){
    const decoded = verifyRefreshToken(token);
    if(decoded){
      const user = decoded.user
      const found = await UserAdmin.findOne({where: {id: user.id, email: user.email}})
      if(found) {
        return true
      }
    }
  return false
};

module.exports = { verifyAdmin };