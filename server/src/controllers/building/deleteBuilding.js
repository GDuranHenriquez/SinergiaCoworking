const {Building, Office} = require("../../db");

const deleteBuilding = async (req, res) =>{
    const { id } = req.params;
    try {
        const building = await Building.findByPk(id);
        if(!building.name || building.deleted) {
            return res.status(404).json({message: 'Edificio no encontrado'});
        }
        // const checkOffice = await Office.findAll({where:{building: id, deleted: false}})
        // if(checkOffice.length){
        //     return res.status(401).json({error: `Existen ${checkOffice.length} oficinas relacionadas con el edificio. Eliminalas y vuelva a intentarlo`})
        // }
        await building.update({deleted: true});
        return res.json({msg: 'Edificio eliminado'});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = deleteBuilding;