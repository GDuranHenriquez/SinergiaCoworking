const {Office, Category, Building, Service, OfficeImage} = require('../../db')

const postOffice = async (req, res)=> {
    const {name, area, capacity, category, building, price, services, images} = req.body
    try {
        if(!name){
            return res.status(401).json({error: 'No se indicó el nombre'})
        }
        if(!area){
            return res.status(401).json({error: 'No se indicó el area'})
        }
        if(!capacity){
            return res.status(401).json({error: 'No se indicó la capacidad'})
        }
        if(!category){
            return res.status(401).json({error: 'No se indicó la categoría'})
        }
        if(!building){
            return res.status(401).json({error: 'No se indicó la sucursal'})
        }
        if(!price){
            return res.status(401).json({error: 'No se indicó el precio'})
        }
        if(!services.length){
            return res.status(401).json({error: 'Debe indicarse al menos un servicio'})
        }
        if(!images.length){
            return res.status(401).json({error: 'Debe proporcionarse al menos una imagen'})
        }
        const checkCategory = await Category.findByPk(category)
        if(!checkCategory){
            return res.status(404).json({error: "El id de categoría provisto no está registrado"})
        }
        const checkBuilding = await Building.findByPk(building)
        if(!checkBuilding){
            return res.status(404).json({error: 'El id de la sucursal provisto no está registrado'})
        }

        const [office, created] = await Office.findOrCreate({where: {name, building, category}, defaults: {area, capacity, price}})
        if(!created) {
            return res.status(401).json({error: 'La oficina ya está registrada'})
        }
        await office.addServices(services)
        const imagesArray = images.map(image => ({imageUrl: image, office: office.id}))
        await OfficeImage.bulkCreate(imagesArray)
        const response = await Office.findOne({where: {id: office.id}, include: [
            {model: Category, as: "office_category"},
            {model: Building, as: "office_building"},
            {model: Service, through: {attributes: []}},
            {model: OfficeImage, as: 'office_officeImage'}
        ]})
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = postOffice