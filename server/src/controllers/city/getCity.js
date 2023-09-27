const { City, Province } = require("../../db");

const getCity = async (req, res) => {
    try {
        const city = await City.findAll({include: [{model: Province, as: "city_province", attributes: ["id"]}]});
        return res.status(200).json(city);   
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = {getCity};