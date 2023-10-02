const { User } = require('../../db');
const { createAccessToken,  createRefreshToken } = require('../../auth/createTokens');
const { generateInfo } = require('../../auth/generateTokens');
const { verify } = require('../../auth/verifyGLTK');
const bcrypt = require('bcrypt')

async function postLoginUser(req, res){
  try {
    const { email, password, token } = req.body;

    if(token){
      const payload = await verify(token);
      const email = payload.email;
      const user = await User.findOne({ where: { email : email } });
      if(user === null){
        return res.status(403).json({error: 'Unregistered user, please create an account, go to create an account to register. '});
      }
      var data = user.dataValues;  

      const accessToken = createAccessToken(data);
      const refreshToken = await createRefreshToken(data);      
  
      return res.status(200).json({
        pass: true, 
        message: 'Correct username and password', 
        user: generateInfo(data),
        accessToken,
        refreshToken
      })     

    }

    const user = await User.findOne({ where: { email: email } });
    if(user === null){
      return res.status(403).json({error: 'Unregistered user, please create an account, go to create an account to register. '});
    }

    var data = user.dataValues;    
    const match = await bcrypt.compare(password, data.password);
   
    if(match){   
      const accessToken = createAccessToken(data);
      const refreshToken = await createRefreshToken(data);      

      return res.status(200).json({
        pass: true, 
        message: 'Correct username and password', 
        user: generateInfo(data),
        accessToken,
        refreshToken
       })
    }else{
      return res.status(403).json({pass: false, message: "Incorrect password or user"})
    }

  } catch (error) {
    return res.status(400).json({error: error.message});
  }
}

module.exports = { postLoginUser };