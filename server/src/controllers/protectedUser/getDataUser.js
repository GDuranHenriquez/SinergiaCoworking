const { User } = require('../../db');

async function getDataUserClient(req, res){
  try {
    const user = req.user;
    const newUser = await User.findOne({ where: { email : email } });
    if(user === null){
      return res.status(403).json({error: 'Unregistered user, please create an account, go to create an account to register. '});
    }
    var data = user.dataValues;  
    data = generateInfo(data)

   return res.status(200).json(data);   
  } catch (error) {
    
  }

   
}

module.exports = {getDataUserClient};