const {Building, City} = require('../../db')

const updateBuilding = async (req, res) => {
    try {
        const {id, name, address, lat, lng, city, imageUrl} = req.body
        if(!id){
            return res.status(401).json({error: 'Falta id de la sucursal'})
        }
        const building = await Building.findOne({where: {id}, include: [{model: City, as: 'building_city'}]})
        if(!building){
            return res.status(404).json({error: 'Sucursal inválida'})
        }
        if(name && name !== building.name){
            building.name = name
        }
        if(address && address !== building.address){
            building.address = address
        }
        if(lat && lat !== building.lat){
            building.lat = lat
        }
        if(lng && lng !== building.lng){
            building.lng = lng
        }
        if(city && city !== building.city){
            const checkCity = await City.findByPk(city)
            if(!checkCity){
                return res.status(404).json({error: 'Ciudad invalida'})
            }
            building.city = city
        }
        if(imageUrl && imageUrl !== building.imageUrl){
            building.imageUrl = imageUrl
        }
        await building.save()
        const response = await Building.findOne({where: {id}, include: [{model: City, as: "building_city"}]})
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = updateBuilding