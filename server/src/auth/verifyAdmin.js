const { decodeToken } = require('./verifyTokens');
const {User} = require('../db')

async function verifyAdmin(token){
    const decoded = decodeToken(token);
    if(decoded){
      const user = decoded.user
      if(user.type === 'admin' || user.type === 'root'){
        const found = await User.findOne({where: {email: user.email}})
        if(found && found.accessLevel === user.type) {
          return true
        }
      }  
    }
  return false
};

module.exports = { verifyAdmin };