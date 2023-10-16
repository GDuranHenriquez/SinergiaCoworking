const { User } = require('../../db');
const { encrypPass } = require('../../utils/crypPass');
const { verify } = require('../../auth/verifyGLTK');
const { generatePassword } = require('../../auth/generatePassword');
const { VerifyIsRoot } = require('../../auth/verifyIsUserRoot');
const { createRefreshToken, createAccessToken } = require('../../auth/createTokens');
const { generateInfo } = require('../../auth/generateTokens');
const { sendMailNewUser } = require('../../utils/nodemailer');

async function postRegisterAcountUser(req, res){
  try {
    
    const { email, password, name, token } = req.body;

    if(token){
      const payload = await verify(token);
      const email = payload.email;
      const name = payload.name;
      const imgUrl = payload.picture;      
      const userRegister = await User.findOne({ where: { email: email } });
      
      if(!(userRegister === null)){
        return res.status(403).json({error: 'El email ya se encuentra registrado'});
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
          email: email, name: nameUser + lastName, accessLevel: 'root', imgUrl:imgUrl});
        
        var data = registerAcountUser.dataValues;
        const accessToken = createAccessToken(data);
        const refreshToken = await createRefreshToken(data);
        
        sendMailNewUser(nameUser + lastName, email);
        return res.status(200).json({
          pass: true, 
          message: 'Correct username and password', 
          user: generateInfo(data),
          accessToken,
          refreshToken
        });
      }else{
        const registerAcountUser = await User.create({password: passCrypt,
        email, name, imgUrl:imgUrl});

        var data = registerAcountUser.dataValues;
        const accessToken = createAccessToken(data);
        const refreshToken = await createRefreshToken(data);
        
        sendMailNewUser(name, email);
        return res.status(200).json({
          pass: true, 
          message: 'Correct username and password', 
          user: generateInfo(data),
          accessToken,
          refreshToken
        });
      }      
    }
    
    if(!name){
      return res.status(403).json({error: 'No se indicó el nombre'})
    };
    if(!email){
      return res.status(403).json({error: 'No se indicó el email'})
    };
    if(!password){
      return res.status(403).json({error: 'No se indicó la contraseña'})
    };
    const userRegister = await User.findOne({ where: { email: email } });

    if(!(userRegister === null)){
      return res.status(403).json({error: 'El email ya esta registrado'});
    };

    if(!(password.length >= 8 && password.length <= 32) ){
      return res.status(403).json({error: 'La contraseña debe contener entre 8 y 32 caracteres'});
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
      sendMailNewUser(name, email);
      return res.status(200).json({
        pass: true, 
        message: 'Correct username and password', 
        user: generateInfo(data),
        accessToken,
        refreshToken
      });
      
    }else{
      const registerAcountUser = await User.create({password: passCrypt,
      email: email, name: nameUser ? (nameUser + name): name})
      
      var data = registerAcountUser.dataValues;
      const accessToken = createAccessToken(data);
      const refreshToken = await createRefreshToken(data);
      sendMailNewUser(nameUser ? (nameUser + name): name, email);
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
