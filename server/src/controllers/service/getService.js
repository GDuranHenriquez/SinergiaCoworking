const { Service } = require("../../db");


const getService = async (req, res) => {
    try {
        const service = await Service.findAll();
        return res.status(200).json(service);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = {getService};