const {Reservation, Office} = require('../../db')

const availabilityCheck = async (req, res) => {
    try {
        const {date, office} = req.body
        const serverDate = new Date()
        const userDate = new Date(date)
        const offset = userDate.getTimezoneOffset() / 60
        userDate.setHours(userDate.getHours() + offset)
        if(userDate.getTime() < serverDate.getTime()){
            return res.status(401).json({error: 'La fecha no puede ser anterior a la actual'})
        }
        const checkOffice = await Office.findByPk(office)
        if(!checkOffice){
            return res.status(404).json({error: 'Oficina no registrada'})
        }
        const reservation = await Reservation.findOne({where: {office}})
        if(!reservation){
            return res.status(200).json({available: true})
        }
        const dbDate = new Date(reservation.date)
        if(userDate.getTime() === serverDate.getTime()){
            return res.status(200).json({available: false})
        }
        return res.status(200).json({available: true})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = availabilityCheck