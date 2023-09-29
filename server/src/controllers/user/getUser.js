const { User } = require("../../db");

const getUser = async (req, res) => {
    try {

        const user = await User.findAll();
        return res.status(200).json(user);

    } catch (error) {

        return res.status(500).json({error: error.message});

    }
};


module.exports = {getUser};