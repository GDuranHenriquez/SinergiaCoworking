const {Building, City} = require('../../db')

const postBuilding = async (req, res)=> {
    const {name, address, lat, lng, city, imageUrl} = req.body
    try {
        if(!name){
            return res.status(401).json({error: 'No se indicó el nombre'})
        }
        if(!address){
            return res.status(401).json({error: 'No se indicó la dirección'})
        }
        if(!lat || !lng){
            return res.status(401).json({error: "Faltan datos de geolocalización"})
        }
        if(!city){
            return res.status(401).json({error: 'No se indicó la ciudad'})
        }
        if(!imageUrl){
            return res.status(401).json({error: 'No se proporciono la imagen'})
        }
        const checkCity = await City.findByPk(city)
        if(!checkCity){
            return res.status(404).json({error: 'El id de ciudad provisto no está registrado'})
        }
        const checkName = await Building.findOne({where: {name, city}})
        if(checkName){
            return res.status(401).json({error: 'El nombre del espacio ya esta registrado en la misma ciudad'})
        }
        const checkLocation = await Building.findOne({where:{address, city}})
        if(checkLocation){
            return res.status(401).json({error: `La dirección ya esta registrada para el espacio: ${checkLocation.name}`})
        }
        const building = await Building.create({name, address, city, lat, lng, imageUrl})
        return res.status(200).json(building)
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = postBuilding