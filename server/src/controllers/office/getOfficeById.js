const {Category, Office, OfficeImage, Score, Service, Reservation, User} = require('../../db')


const getOfficeById = async (req, res) => {
    try {
        const { id } = req.params
        const office = await Office.findOne({where: {id}, 
            include: [
                {model: Service, through: {attributes: []}},
                {model: Category, as: 'office_category'},
                {model: OfficeImage, as: 'office_officeImage'},
                {model: Reservation, as: 'office_reservation'},
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