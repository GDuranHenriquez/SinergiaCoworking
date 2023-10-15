const {Office, Reservation} = require('../../db')

const checkSpace = async (req, res) => {
    try {
        const {office, date} = req.query
        if(!office){
            return res.status(401).json({error: 'Falta id de oficina'})
        }
        if(!date){
            return res.status(401).json({error: 'Falta fecha'})
        }
        const checkOffice = await Office.findOne({where: {id: office, deleted: false}, include: [{model: Reservation, as: 'office_reservation'}]})
        if(!checkOffice){
            return res.status(404).json({error: 'Oficina invalida'})
        }
        const serverDate = new Date()
        const formatedServerDate = new Date(`${serverDate.getFullYear()}-${serverDate.getMonth()+1}-${serverDate.getDate()}`)
        const reservationDate = new Date(date)
        const offset = reservationDate.getTimezoneOffset() / 60
        reservationDate.setHours(reservationDate.getHours() + offset)
        if(reservationDate.getTime() < formatedServerDate.getTime()){
            return res.status(401).json({error: 'La fecha no puede ser anterior a la actual'})
        }
        const checkDateText = `${reservationDate.getFullYear()}-${reservationDate.getMonth() + 1}-${reservationDate.getDate()}`
        const checkDate = new Date(checkDateText)
        const reservations = await Reservation.sum('amount', {where: {office, date: checkDate}})
        return res.status(200).json({availableSpaces: checkOffice.capacity - reservations})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = checkSpace