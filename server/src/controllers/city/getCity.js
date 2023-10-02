const {City} = require("../../db");

const getCity = async (req, res) => {
    try {
        const cities = await City.findAll();

        return res.status(200).json(cities);   
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getCity };
