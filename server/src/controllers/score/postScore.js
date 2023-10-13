const {Score, User, Office, Reservation} = require('../../db')
const sequelize = require('sequelize')

const postScore = async (req, res) => {
    try {
        const {stars, comment, user, reservation} = req.body
        if(!stars){
            return res.status(401).json({error: 'Debe seleccionar al menos una'})
        }
        if(!comment){
            return res.status(401).json({error: 'Debe realizar un comentario'})
        }
        if(comment.length >140){
            return res.status(401).json({error: 'El comentario no debe superar los 140 caracteres'})
        }
        if(!user){
            return res.status(401).json({error: 'No se proporcionó un usuario'})
        }
        if(!reservation){
            return res.status(401).json({error: 'Falta id de la reserva'})
        }
        const checkUser = await User.findByPk(user)
        if(!checkUser){
            return res.status(404).json({error: 'El usuario no existe'})
        }

        const checkReservation = await Reservation.findByPk(reservation)
        if(!checkReservation){
            return res.status(404).json({error: 'La reserva no existe'})
        }
        const office = await Office.findByPk(checkReservation.office)
        if(!office){
            return res.status(404).json({error: 'La oficina no existe'})
        }
        const actualDate = new Date()
        const date = `${actualDate.getFullYear()}/${actualDate.getMonth}/${actualDate.getDate()}`
        const [score, created] = await Score.findOrCreate({where: {user, reservation}, defaults: {score: stars, comment, date: actualDate, office: checkReservation.office}})
        if(!created){
            return res.status(401).json({error: 'Lo sentimos, pero solo puede valorar la oficina una sola vez por reservación, disculpe las molestias'})
        }
        const scores = await Score.findAll({where: {office: checkReservation.office}, attributes:[[sequelize.fn("avg", sequelize.col("score")), "average"]], raw: true})
        const averageRating = parseFloat(scores[0].average || 0).toFixed(1);
        office.ratingAverage = averageRating
        await office.save()
        return res.status(200).json({score})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = postScore