const { User } = require('../../db');
const { generateInfo } = require('../../auth/generateTokens');
async function getDataUserClient(req, res){
  try {
    const user = req.user;
    const newUser = await User.findOne({ where: { id : user.id } });
    if(newUser === null){
      return res.status(403).json({error: 'Unregistered user, please create an account, go to create an account to register. '});
    }
    var data = newUser.dataValues;  
    data = generateInfo(data)
   return res.status(200).json(data);   
  } catch (error) {
    
  }

   
}

module.exports = {getDataUserClient};