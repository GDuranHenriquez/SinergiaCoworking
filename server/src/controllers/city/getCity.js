const {City, Province} = require("../../db");

const getCity = async (req, res) => {
    try {
        const cities = await City.findAll({
            include: [{
                model: Province,
                as: "city_province",
                attributes: ["id", "name"]
            }]
        });

        return res.status(200).json(cities);   
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getCity };
