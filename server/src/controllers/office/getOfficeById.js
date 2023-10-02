const {Category, Office, OfficeImage, Score, Service, Reservation} = require('../../db')


const getOfficeById = async (req, res) => {
    try {
        const { id } = req.params
        const office = await Office.findOne({where: {id}, 
            include: [
                {model: Service, through: {attributes: []}},
                {model: Category, as: 'office_category'},
                {model: OfficeImage, as: 'office_officeImage'},
                {model: Reservation, as: 'office_reservation'},
                {model: Score, as: 'office_score'}
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