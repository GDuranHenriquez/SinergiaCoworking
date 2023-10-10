const { User } = require("../../db");
const { encrypPass } = require("../../utils/crypPass");
const bcrypt = require('bcrypt')
const { getTokenFromHeader } = require("../token/getTokenFromHeader");

const updateUser = async (req, res) => {
  try {
    const { password, imgUrl } = req.body;
    const id = req.user.id;
    let dataUpdate = {};
    const dataToUpdate = req.user;
    
    if (!password && !imgUrl) {
      return res.status(403).json({ error: "Mandatory data is missing" });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res
        .status(404)
        .json({ error: "The id provided doesn't match any user" });
    }

    if (password) {
        if (!(password.length >= 8 && password.length <= 32)) {
            return res
            .status(403)
            .json({ error: "The password must be between 8 and 32 characters" });
        }
        const passCrypt = await encrypPass(password);
        const check = await bcrypt.compare(user.password, passCrypt);
        if (check){
            return res.status(403).json({ error: "The new password must be different from the previous one"});
        }         
        dataUpdate.password = passCrypt; 
    }
    if(imgUrl){
        dataUpdate.imgUrl = imgUrl;
        dataToUpdate.imgUrl = imgUrl;
    }
    const userUpdated = await User.update(dataUpdate, {where:{id:id}})
    
    
    return res.status(200).json({userUpdate: dataToUpdate});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { updateUser };
