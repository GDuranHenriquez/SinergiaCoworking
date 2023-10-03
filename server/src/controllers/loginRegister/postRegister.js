const { User } = require('../../db');
const { encrypPass } = require('../../utils/crypPass');
const { verify } = require('../../auth/verifyGLTK');
const { generatePassword } = require('../../auth/generatePassword');
const { VerifyIsRoot } = require('../../auth/verifyIsUserRoot');
const { createRefreshToken, createAccessToken } = require('../../auth/createTokens');
const { generateInfo } = require('../../auth/generateTokens');

async function postRegisterAcountUser(req, res){
  try {
    
    const { email, password, name, token } = req.body;

    if(token){
      const payload = await verify(token);
      const email = payload.email;
      const name = payload.name;      
      const userRegister = await User.findOne({ where: { email: email } });
      
      if(!(userRegister === null)){
        return res.status(403).json({error: 'This user is already registered'});
      };

      let nameEmail = payload.name;
      var nameUser = '';
      var lastName = '';
      nameEmail = nameEmail.split(' ');
      if(nameEmail.length >= 2){
        nameUser = nameEmail[0];
        lastName = nameEmail[1];
      }else{
        nameUser = nameEmail[0];
      };

      const password = generatePassword();
      const passCrypt = await encrypPass(password);
      //const compare = bcrypt.compareSync(password, userPass);

      const isRoot = VerifyIsRoot(email);
      if(isRoot){
        const registerAcountUser = await User.create({password: passCrypt,
          email: email, name: nameUser + lastName, accessLevel: 'root'});
        
        var data = registerAcountUser.dataValues;
        const accessToken = createAccessToken(data);
        const refreshToken = await createRefreshToken(data);

        return res.status(200).json({
          pass: true, 
          message: 'Correct username and password', 
          user: generateInfo(data),
          accessToken,
          refreshToken
        });
      }else{
        const registerAcountUser = await User.create({password: passCrypt,
        email: email, name: nameUser + lastName});

        var data = registerAcountUser.dataValues;
        const accessToken = createAccessToken(data);
        const refreshToken = await createRefreshToken(data);

        return res.status(200).json({
          pass: true, 
          message: 'Correct username and password', 
          user: generateInfo(data),
          accessToken,
          refreshToken
        });
      }      
    }
    
    if( !name || !email || !password){
      return res.status(403).json({error: 'Mandatory data is missing'})
    };

    const userRegister = await User.findOne({ where: { email: email } });

    if(!(userRegister === null)){
      return res.status(403).json({error: 'This user is already registered'});
    };

    if(!(password.length >= 8 && password.length <= 32) ){
      return res.status(403).json({error: 'The password must be between 8 and 32 characters'});
    };

    const passCrypt = await encrypPass(password);
    //const compare = bcrypt.compareSync(password, userPass);

    const isRoot = VerifyIsRoot(email);
    if(isRoot){
      const registerAcountUser = await User.create({password: passCrypt,
        email: email, name: name , accessLevel: 'root'})

      var data = registerAcountUser.dataValues;
      const accessToken = createAccessToken(data);
      const refreshToken = await createRefreshToken(data);

      return res.status(200).json({
        pass: true, 
        message: 'Correct username and password', 
        user: generateInfo(data),
        accessToken,
        refreshToken
      });
      
    }else{
      const registerAcountUser = await User.create({password: passCrypt,
      email: email, name: nameUser + name})
      
      var data = registerAcountUser.dataValues;
      const accessToken = createAccessToken(data);
      const refreshToken = await createRefreshToken(data);

      return res.status(200).json({
        pass: true, 
        message: 'Correct username and password', 
        user: generateInfo(data),
        accessToken,
        refreshToken
      });
    }
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = { postRegisterAcountUser };