const {Purchase, Office, Reservation, Category} = require('../../db')
require('dotenv').config();
const { SKSTRIPE_PRIVATE } = process.env;


const availabilityCheck = async (req, res) => {
    try {
        const {date, office, amount} = req.query
        if(!office){
            return res.status(401).json({error: 'Falta id de oficina'})
        }
        if(!date){
            return res.status(401).json({error: 'Falta fecha'})
        }
        const checkOffice = await Office.findOne({where: {id: office, deleted: false}, include: [{model: Reservation, as: 'office_reservation'}, {model: Category, as: 'office_category'}]})
        if(!checkOffice){
            return res.status(404).json({error: 'Oficina invalida'})
        }
        const openSpace = checkOffice.office_category.name === "Open space"
        if(!amount){
            return res.status(401).json({error: 'Falta cantidad de espacios'})
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
        const reservations = await Reservation.findAll({where: {office, date: checkDate}})
        const price = openSpace ? checkOffice.price * amount : checkOffice.price
        const stripe = require('stripe')(SKSTRIPE_PRIVATE);
        
        if(!reservations.length){
            if(openSpace){
                if(amount > checkOffice.capacity){
                    return res.status(200).json({available: false})
                }
            }
            const paymentIntent = await stripe.paymentIntents.create({
                amount: req.body.amount * 100,
                currency: 'usd',
                payment_method_types: ['card'],
                description: req.body.description,
            })
            const itentPaiment = {
                id_itent: paymentIntent.id,
                client_secret : paymentIntent.client_secret,
            }
            return res.status(200).json({available: true, price, itentPaiment})
        }
        if(openSpace){
            let totalAmount = 0
            reservations.forEach(reservation => totalAmount += reservation.amount);
            if((totalAmount + Number(amount)) <= checkOffice.capacity){
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: req.body.amount * 100,
                    currency: 'usd',
                    payment_method_types: ['card'],
                    description: req.body.description,
                })
                const itentPaiment = {
                    id_itent: paymentIntent.id,
                    client_secret : paymentIntent.client_secret,

                }
                return res.status(200).json({available: true, price, itentPaiment})
            }
        }
        return res.status(200).json({available: false})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = availabilityCheck