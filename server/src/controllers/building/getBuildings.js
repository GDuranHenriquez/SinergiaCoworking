const {Building, Category, City, Office, Service, Score} = require('../../db')

const getBuildings = async (req, res) => {
    try {
        const {city, category} = req.body
        const filters = {basic:{}, category:{}}
        const isAdmin = false // Aplicar validacion por token
        if(!isAdmin){
            filters.basic.deleted = false
        }
        if(city){
            const checkCity = await City.findByPk(city)
            if(!checkCity){
                return res.status(401).json({error: 'Ciudad no registrada'})
            }
            filters.basic.city = city
        }
        if(category){
            const checkCategory = await Category.findByPk(category)
            if(!checkCategory){
                return res.status(401).json({error: 'Categoria no registrada'})
            }
            filters.category = {category}
        }
        const buildings = await Building.findAll({
            where: filters.basic,
            include:[
                {model: City, as: 'building_city'},
                {model: Office, as: 'office_building', where: filters.category, include:[
                    {model: Category, as: 'office_category'},
                    {model: Service, through: {attributes: []}},
                    // {model: Score, as: 'office_score'}
                ]}
            ]
        })
        return res.status(200).json(buildings)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = getBuildings