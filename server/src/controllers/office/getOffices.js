const {Category, Office, OfficeImage, Score, Service, Reservation} = require('../../db')

const getAllOffices = async (req, res) => {
    try {
        const {building, category} = req.body
        const isAdmin = false //Aplicar validacion por token
        const filters = {basic: {building}}
        if(!isAdmin){
            filters.basic.deleted = false
        }
        if(category){
            const checkCategory = await Category.findByPk(category)
            if(!checkCategory){
                return res.status(401).json({error: 'Categoria no registrada'})
            }
            filters.basic.category = category
        }
        const offices = await Office.findAll({
            where: filters.basic,
            include:[
                {model: Category, as: 'office_category'},
                {model: Service, through: {attributes: []}},
                // {model: Score, as: 'office_score'},
                {model: OfficeImage, as: 'office_officeImage'},
                {model: Reservation, as:'office_reservation'}
            ]
        })
        return res.status(200).json({offices})
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = getAllOffices