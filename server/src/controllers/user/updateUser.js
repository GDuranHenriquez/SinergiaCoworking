const { User } = require("../../db");

const updateUser = async (req, res) => {
    try {
        const {name, email, password, accessLevel, location} = req.body
        if(!name || !email || !password || !accessLevel || !location) {
            return res.status(403).json({error: "Mandatory data is missing"})
        }
        const user = await User.findByPk(id)
        if(!user) {
            return res.status(404).json({error: "The id provided doesn't match any user"})
        }
        if(user.name === name && user.email === email && user.password === password && user.accessLevel === accessLevel && user.location === location) {
            return res.status(403).json({error: "At least one change must be made to update a user"})
        }

        const newUser = {
            name,
            email,
            password,
            accessLevel,
            location
        }

        await user.update(newUser)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = {updateUser};