const { City } = require("../../db");

const postCity = async (req, res) => {
    try {

        const {name} = req.body;

        if(!name) {
            return res.status(404).json({error: "Mandatory data is missing"})
        }

        const city = await City.create({name});
        return res.status(200).json(city);

    } catch (error) {

        res.status(500).json({error: error.message});

    }
};

module.exports = {postCity};