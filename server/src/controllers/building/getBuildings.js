const {Building, Category, City, Office} = require('../../db')
const {Op} = require('sequelize')
const {getTokenFromHeader} = require('../../token/getTokenFromHeader')
const {verifyAdmin} = require('../../auth/verifyAdmin')

const getBuildings = async (req, res) => {
    try {
        const {name, city, category} = req.query
        let isAdmin = false
        const token = getTokenFromHeader(req.headers)
        if(token !== null){
            isAdmin = await verifyAdmin(token)
        }
        const buildingFilters = {}
        const officeFilters = {};
        if(!isAdmin){
            buildingFilters.deleted = false
            // officeFilters.deleted = false
        }
        if(name){
            buildingFilters.name = {
                [Op.iLike]: `%${name}%`,
            }
        }
        if(city){
            const checkCity = await City.findByPk(city)
            if(!checkCity){
                return res.status(401).json({error: 'Ciudad no registrada'})
            }
            buildingFilters.city = city
        }
        
        if (category) {
            const checkCategory = await Category.findByPk(category);
            if (!checkCategory) {
                return res.status(401).json({ error: 'Categoría no registrada' });
            }
            const filteredOffices = await Office.findAll({
                where: {category}
            });
            const buildingIdsFiltered = filteredOffices.map(office => office.building)
            buildingFilters.id = buildingIdsFiltered
        }
        const buildings = await Building.findAll({
            where: buildingFilters,
            include:[
                {model: City, as: 'building_city'},
                {model: Office, as: 'office_building', where:{deleted: false}, attributes: ['category'], include: [{model: Category, as:'office_category'} ], required: false}
            ]
        })
        return res.status(200).json(buildings)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = getBuildings
