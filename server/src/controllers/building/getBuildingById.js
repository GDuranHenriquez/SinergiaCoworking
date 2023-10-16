const { Building, City, Office, OfficeImage } = require("../../db");
const {getTokenFromHeader} = require('../../token/getTokenFromHeader')
const {verifyAdmin} = require('../../auth/verifyAdmin')

const getBuildingById = async (req, res) => {
    try {
        const { id } = req.params;
        let isAdmin = false
        const token = getTokenFromHeader(req.headers)
        if(token !== null){
            isAdmin = await verifyAdmin(token)
        }
        const filters = {id}
        if(!isAdmin){
            filters.deleted = false
        }
        const building = await Building.findOne({where: filters,
            include: [
                {model: City, as: "building_city"},
                {model: Office, as: "office_building", where: {deleted: false}, include: [{model: OfficeImage, as: 'office_officeImage'}], required: false}
            ]});

        if(!building) {
            return res.status(404).json({message: "No se encontró la sucursal"})
        }
        return res.status(200).json(building);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};


module.exports = getBuildingById;