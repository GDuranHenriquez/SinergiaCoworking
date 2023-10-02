const { Building, City, Office } = require("../../db");


const getBuildingById = async (req, res) => {
    try {
        const { id } = req.params;
        const building = await Building.findOne({where: {id},
            include: [
                {model: City, as: "building_city"},
                {model: Office, as: "office_building"}
            ]});

        if(!building) {
            return res.status(404).json({message: "No se encontro el edificio"})
        }
        return res.status(200).json(building);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};


module.exports = getBuildingById;