const {Category, Office, OfficeImage, Score, Service, Reservation, Building} = require('../../db')
const {getTokenFromHeader} = require('../../token/getTokenFromHeader')
const {verifyAdmin} = require('../../auth/verifyAdmin')

const getAllOffices = async (req, res) => {
    try {
        const {building, category, capacity, order, sort} = req.body
        let isAdmin = false
        const token = getTokenFromHeader(req.headers)
        if(token !== null){
            isAdmin = await verifyAdmin(token)
        }
        const filters = {basic: {}}
        if(!isAdmin){
            filters.basic.deleted = false
        }
        if(category){
            const checkCategory = await Category.findByPk(category)
            if(!checkCategory){
                return res.status(404).json({error: 'Categoria no registrada'})
            }
            filters.basic.category = category
        }
        if(building){
            const checkBuilding = await Building.findByPk(building)
            if(!checkBuilding){
                return res.status(404).json({error: 'Sucursal no registrada'})
            }
            filters.basic.building = building
        }
        let searchOrder = order ? order : 'ASC'
        let searchSort = sort ? sort === "rating" ? "ratingAverage" : sort : 'name'
        let orderConfig = [[searchSort, searchOrder]]

        const offices = await Office.findAll({
            where: filters.basic,
            include:[
                {model: Category, as: 'office_category'},
                {model: Service, through: {attributes: []}},
                {model: Score, as: 'office_score'},
                {model: OfficeImage, as: 'office_officeImage'},
                {model: Reservation, as:'office_reservation'},
                {model: Building, as: 'office_building'}
            ], order: orderConfig
        })
        return res.status(200).json(offices)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = getAllOffices