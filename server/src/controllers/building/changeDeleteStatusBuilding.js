const {Building, Office} = require("../../db");

const changeDeleteStatusBuilding = async (req, res) =>{
    try {
        const { id } = req.params;
        if(!id){
            return res.status(401).json({error: 'Falta id sucursal'})
        }
        const building = await Building.findByPk(id);
        if(!building) {
            return res.status(404).json({message: 'Sucursal inválida'});
        }
        // const checkOffice = await Office.findAll({where:{building: id, deleted: false}})
        // if(checkOffice.length){
        //     return res.status(401).json({error: `Existen ${checkOffice.length} oficinas relacionadas con la sucursal. Eliminalas y vuelva a intentarlo`})
        // }
        if(building.deleted){
            await building.update({deleted: false})
            return res.status(200).json({msg: 'Sucursal restaurada'})
        }
        await building.update({deleted: true});
        return res.json({msg: 'Sucursal eliminada'});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = changeDeleteStatusBuilding;