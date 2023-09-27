const { User } = require("../../db");

const postUser = async (req, res) => {
    try {
        const { name, email, password, location } = req.body;
        if(!name || !email || !password || !location) {
            return res.status(404).json({error: "Mandatory data is missing"});
        }
        const [user, created] = await User.findOrCreate({where: {email}, defaults: {name, password, accessLevel, location}});
        if(created) {
            const response = {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                accessLevel: user.accessLevel,
                location: user.location     
            } 
            return res.status(200).json(response);
        }
        return res.status(401).json({error: `User Email: ${email}, is already registered`});
    } catch (error) {
        return res.status(500).send({error: error.message}); 
    }
};

module.exports = {postUser};