const { City, Building } = require("../../db");

async function deleteCity(req, res) {
    const {cityId} = req.params;
    try {
        const city = await City.findByPk(cityId);
        if(!city.name || city.deleted) {
            return res.status(404).json({msg: 'City not found'});
        }
        const checkBuilding = await Building.findAll({where:{city: cityId, deleted: false}})
        if(checkBuilding.length){
            return res.status(401).json({error: `Existen ${checkBuilding.length} sucursales relacionadas con la ciudad. Elimine las sucursales y vuelva a intentarlo`})
        }
        await city.update({deleted: true});
        return res.json({msg: 'City Deleted'});
    } catch (error) {
        return res.status(500).json({msg: `Something went wrong: ${error.message}`});
    }
}

module.exports = {deleteCity};