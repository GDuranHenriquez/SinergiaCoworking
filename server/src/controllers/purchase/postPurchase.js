const {Purchase, Office, Reservation, User, Building} = require('../../db')
const { sendRentSpaceToUser } = require('../../utils/nodemailer');

const postPurchase = async (req, res) => {
    try {
        const {user, office, date, stripe, price, amount, typeOffice, address} = req.query
        if(!user){
            return res.status(401).json({error: 'Falta id de usuario'})
        }
        if(!office){
            return res.status(401).json({error: 'Falta id de oficina'})
        }
        if(!date){
            return res.status(401).json({error: 'Falta fecha'})
        }
        if(!stripe){
            return res.status(401).json({error: 'Falta id de compra'}) // Ver posibilidad de conectar con stripe y verificar estado de pago
        }
        const checkUser = await User.findByPk(user)
        if(!checkUser){
            return res.status(404).json({error: 'Usuario invalido'})
        }
        const checkOffice = await Office.findByPk(office)
        if(!checkOffice){
            return res.status(404).json({error: 'Oficina invalida'})
        }
        const actualDate = new Date()
        const reservationDate = new Date(date)
        // const reservationDateText = `${reservationDate.getDate()}/${reservationDate.getMonth() + 1}/${reservationDate.getFullYear()}`
        // const dbDate = new Date(reservationDateText)
        const purchase = await Purchase.create({date: actualDate, totalPrice: price, user})
        const reservation = await Reservation.create({date: reservationDate, purchase: purchase.id, office, amount})
        const response = await Reservation.findOne({where: {id: reservation.id}, include: [{model: Office, as: 'office_reservation', include:[{model: Building, as: 'office_building'}]}]})
        
        
        sendRentSpaceToUser(checkUser.email, checkUser.name, typeOffice, response.office_reservation.name, reservation.date, purchase.date, price, amount, response.office_reservation.price, response.office_reservation.office_building.address)
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = postPurchase