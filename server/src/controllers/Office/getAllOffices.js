const {Office, Service} = require('../../db')


const getAllOffices = async (res, res) => {
    try {
        const offices = await Office.findAll({
            include: [
                {model: Service, through: {attributes: []}}
            ]});

            return res.status(200).json(offices);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = getAllOffices