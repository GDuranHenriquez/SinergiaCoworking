const {Purchase, Office, Reservation, User} = require('../../db')

const availabilityCheck = async (req, res) => {
    try {
        const {date, office} = req.query
        if(!office){
            return res.status(401).json({error: 'Falta id de oficina'})
        }
        if(!date){
            return res.status(401).json({error: 'Falta fecha'})
        }
        const checkOffice = await Office.findOne({where: {id: office}, include: [{model: Reservation, as: 'office_reservation'}]})
        if(!checkOffice){
            return res.status(404).json({error: 'Oficina invalida'})
        }
        const serverDate = new Date()
        const reservationDate = new Date(date)
        const offset = reservationDate.getTimezoneOffset() / 60
        reservationDate.setHours(reservationDate.getHours() + offset)
        if(reservationDate.getTime() < serverDate.getTime()){
            return res.status(401).json({error: 'La fecha no puede ser anterior a la actual'})
        }
        const checkDateText = `${reservationDate.getFullYear()}-${reservationDate.getMonth() + 1}-${reservationDate.getDate()}`
        const checkDate = new Date(checkDateText)
        const reservation = await Reservation.findOne({where: {office, date: checkDate}})
        if(!reservation){
            return res.status(200).json({available: true})
        }
        return res.status(200).json({available: false})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = availabilityCheck