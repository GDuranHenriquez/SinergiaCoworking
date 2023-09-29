const {Building, City} = require('../../db')

const postBuilding = async (req, res)=> {
    const {address, lat, lng, city, imageUrl} = req.body
    try {
        if(!address){
            return res.status(401).json({error: 'No se indicó la dirección'})
        }
        if(!lat || !lng){
            return res.status(401).json({error: "Faltan datos de geolocalización"})
        }
        if(!city){
            return res.status(401).json({error: 'No se indicó la ciudad'})
        }
        const checkCity = await City.findByPk(city)
        if(!checkCity){
            return res.status(404).json({error: 'El id de ciudad provisto no está registrado'})
        }

        const [building, created] = await Building.findOrCreate({where: {address, city, lat, lng}})
        if(!created) {
            return res.status(401).json({error: 'El edificio ya está registrada'})
        }
        return res.status(200).json(building)
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = postBuilding