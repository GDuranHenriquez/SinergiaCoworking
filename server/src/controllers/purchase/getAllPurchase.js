const {Purchase, User, Office, Building, Reservation, Score} = require('../../db')

const getAllPurchase = async (req, res) => {
    try {
        const {user} = req.params
        let reservations = []
        if(!user){
            return res.status(401).json({error: 'Falta id de usuario'})
        }
        const checkUser = await User.findOne({
            where: {id: user},
            attributes: [],
            include:[
                {
                    model: Purchase, 
                    as: 'user_purchase', 
                    attributes: ['id', 'totalPrice'], 
                    include: [
                        {
                            model: Reservation, 
                            as: 'purchase_reservation', 
                            attributes: ['id', 'date', 'amount', 'office'], 
                            
                        }
                    ]
                }
            ]
        })
        for(let i=0; i<checkUser.user_purchase.length; i++){
            const reservation = {}
            reservation.id = checkUser.user_purchase[i].purchase_reservation.id
            reservation.totalPrice = checkUser.user_purchase[i].totalPrice
            reservation.date = checkUser.user_purchase[i].purchase_reservation.date
            reservation.amount = 
            reservations.push()
        }
        return res.status(200).json(checkUser)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = getAllPurchase