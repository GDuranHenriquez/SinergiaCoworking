const {Building, Category, City, Office, Service, Score} = require('../../db')

const getBuildings = async (req, res) => {
    try {
        const {city, category} = req.body
        const buildingFilters = {}
        const isAdmin = false // Aplicar validacion por token
        if(!isAdmin){
            buildingFilters.deleted = false
        }
        if(city){
            const checkCity = await City.findByPk(city)
            if(!checkCity){
                return res.status(401).json({error: 'Ciudad no registrada'})
            }
            buildingFilters.city = city
        }
        const officeFilters = {};
        if (category) {
            const checkCategory = await Category.findByPk(category);
            if (!checkCategory) {
                return res.status(401).json({ error: 'Categoría no registrada' });
            }
            officeFilters.category = category;
        }
        const filteredOffices = await Office.findAll({
            where: officeFilters
        });
        const buildingIdsFiltered = filteredOffices.map(office => office.building)
        const buildings = await Building.findAll({
            where: {...buildingFilters, id: buildingIdsFiltered},
            include:[
                {model: City, as: 'building_city'},
                {model: Office, as: 'office_building'}
            ]
        })
        return res.status(200).json(buildings)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = getBuildings