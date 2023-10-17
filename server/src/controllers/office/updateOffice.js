const {Office, OfficeImage, Service, Category, Building} = require('../../db')

const updateOffice = async (req, res) => {
    try {
        const {id, name, area, capacity, category, building, price, services, images } = req.body
        if(!id){
            return res.status(401).json({error: 'Falta id de oficina'})
        }
        const office = await Office.findOne({where: {id}, include: [{model: OfficeImage, as: 'office_officeImage'}, {model: Service, through: {attributes: []}}]})
        if(!office){
            return res.status(404).json({error: 'No se encontró la oficina'})
        }
        if(name && name !== office.name){
            office.name = name
        }
        if(area && area !== office.area){
            office.area = area
        }
        if(capacity && capacity !== office.capacity){
            office.capacity = capacity
        }
        if(price && price !== office.price){
            office.price = price
        }
        if(category && category !== office.category){
            const checkCategory = await Category.findByPk(category)
            if(!checkCategory){
                return res.status(404).json({error: "El id de categoría provisto no está registrado"})
            }
            office.category = category
        }
        if(building && building !== office.building){
            const checkBuilding = await Building.findByPk(building)
            if(!checkBuilding){
                return res.status(404).json({error: 'El id de sucursal provisto no está registrado'})
            }
            office.building = building
        }
        await office.save()
        if(images && images.length){
            const imageIds = office.office_officeImage.map(image => image.id);
            await OfficeImage.destroy({where: {id: imageIds}})
            const imagesArray = images.map(image => ({imageUrl: image, office: office.id}))
            await OfficeImage.bulkCreate(imagesArray)
        }
        if(services && services.length){
            await office.setServices(services)
        }
        const response = await Office.findOne({where: {id}, include: [
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

module.exports = updateOffice