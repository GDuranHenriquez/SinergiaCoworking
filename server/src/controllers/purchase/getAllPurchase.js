const {Purchase, User, Office, Building, Reservation, Score, Category, OfficeImage} = require('../../db')

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
                            include: [{
                                model: Score,
                                as: 'reservation_score',
                                attributes: ['score', 'comment']
                            }]
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
            reservation.amount = checkUser.user_purchase[i].purchase_reservation.amount
            reservation.score = checkUser.user_purchase[i].purchase_reservation.reservation_score
            const office = await Office.findOne({
                where: {id: checkUser.user_purchase[i].purchase_reservation.office},
                attributes: ['name', 'area', 'capacity', 'ratingAverage'],
                include: [
                    {model: Building, as: 'office_building', attributes: ['name', 'address', 'imageUrl']}, 
                    {model: Category, as: 'office_category', attributes: ['name']},
                    {model: OfficeImage, as: 'office_officeImage', attributes: ['imageUrl']}
                ]
            })
            reservation.office = office
            reservations.push(reservation)
        }
        return res.status(200).json(reservations)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = getAllPurchase