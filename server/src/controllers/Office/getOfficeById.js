const {Office, Service} = require('../../db')


const getOfficeById = async (res, res) => {
    try {
        const { id } = req.params
        const office = await Office.findOne({where: {id}, 
            include: [
                {model: Service, through: {attributes: []}}
            ]});

        if(office) {
            return res.status(200).json(office);
        } else {
            return res.status(404).json({ message: "Office not found" });
        }
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = getOfficeById