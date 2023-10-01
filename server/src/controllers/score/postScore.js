const {Score, User, Office} = require('../../db')
const sequelize = require('sequelize')

const postScore = async (req, res) => {
    try {
        const {stars, comment, user, office} = req.body
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
        if(!office){
            return res.status(401).json({error: 'No se proporcionó una oficina'})
        }
        const checkUser = await User.findByPk(user)
        if(!checkUser){
            return res.status(404).json({error: 'El usuario no existe'})
        }
        const checkOffice = await Office.findByPk(office)
        if(!checkOffice){
            return res.status(404).json({error: 'La oficina no existe'})
        }
        const actualDate = new Date()
        const date = `${actualDate.getFullYear()}/${actualDate.getMonth}/${actualDate.getDate()}`
        const [score, created] = await Score.findOrCreate({where: {user, office}, defaults: {score: stars, comment, date: actualDate}})
        if(!created){
            return res.status(401).json({error: 'Lo sentimos, pero solo puede valorar la oficina una sola vez, disculpe las molestias'})
        }
        const scores = await Score.findAll({where: {office}, attributes:[[sequelize.fn("avg", sequelize.col("score")), "average"]], raw: true})
        const averageRating = parseFloat(scores[0].average || 0).toFixed(1);
        checkOffice.ratingAverage = averageRating
        await checkOffice.save()
        return res.status(200).json({score})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = postScore