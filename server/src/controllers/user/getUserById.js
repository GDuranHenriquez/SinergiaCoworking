const { User } = require("../../db");

const getUserById = async (req, res) => {
    const {userId} = req.params;
    try {
        const user = await User.findOne({where: {id: userId}});

        if(!user || user.deleted) {
            return res.status(404).json({error: "User not found"});
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({error: `Something went wrong: ${error.message}`});
    }
};

module.exports = {getUserById};