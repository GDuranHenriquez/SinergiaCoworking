const {Category, Office, OfficeImage, Score, Service, Reservation, User} = require('../../db')
const {Op} = require('sequelize')
const {getTokenFromHeader} = require('../../token/getTokenFromHeader')
const {verifyAdmin} = require('../../auth/verifyAdmin')

const getOfficeById = async (req, res) => {
    try {
        const { id } = req.params
        let isAdmin = false
        const token = getTokenFromHeader(req.headers)
        if(token !== null){
            isAdmin = await verifyAdmin(token)
        }
        const filters = {id}
        if(!isAdmin){
            filters.deleted = false
        }
        let actualDate = new Date()
        actualDate = new Date(`${actualDate.getFullYear()}-${actualDate.getMonth()+1}-${actualDate.getDate()-1}`)
        const office = await Office.findOne({where: filters,
            include: [
                {model: Service, through: {attributes: []}},
                {model: Category, as: 'office_category'},
                {model: OfficeImage, as: 'office_officeImage'},
                {model: Reservation, as: 'office_reservation', where: {date: {[Op.gt]: actualDate}}, required: false},
                {model: Score, as: 'office_score', include: [{model: User, as: 'user_score', attributes:['name', 'imgUrl']}]}
            ]});

        if(!office) {
            return res.status(404).json({ message: "No se encontró la oficina" });
        }
        return res.status(200).json(office);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = getOfficeById