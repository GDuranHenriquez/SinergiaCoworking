const { Op } = require('sequelize')
const {Reservation, Office, Building, City, Category} = require('../../db')

const adminChart = async (req, res) => {
    try {
        let monthText = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        let monthNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,]
        let actualDate = new Date()
        actualDate = new Date(`${actualDate.getFullYear()}-${actualDate.getMonth() + 2}-01`)
        const month = actualDate.getMonth()+1
        let startDate
        if(month-6 <= 0){
            startDate = new Date(`${actualDate.getFullYear()-1}-${month-6+12}-01`)
        } else {
            startDate = new Date(`${actualDate.getFullYear()}-${month-6}-01`)
        }
        monthText = monthText.slice(startDate.getMonth(), month-1)
        monthNum = monthNum.slice(startDate.getMonth(), month-1)
        const reservations = await Reservation.findAll({
            where: {
              date: {
                [Op.between]: [startDate, actualDate],
              },
            },
            include: [
              {
                model: Office,
                as: 'office_reservation',
                include: [
                  {
                    model: Category,
                    as: 'office_category',
                  },
                  {
                    model: Building,
                    as: 'office_building',
                    include: [
                      {
                        model: City,
                        as: 'building_city',
                      },
                    ],
                  },
                ],
              },
            ],
          })
        const cities = await City.findAll()
        const categories = await Category.findAll()
        const dataChart = []
        cities.forEach((city) => {
            const data = {}
            const category = categories.map(category => ({name: category.name, data: [0,0,0,0,0,0]}))
            dataChart.push({cityName: city.name, series: category})
        })
        reservations.forEach((reservation) => {
            for(let i=0; i<dataChart.length; i++){
                if(reservation.office_reservation.office_building.building_city.name === dataChart[i].cityName){
                    dataChart[i].series.forEach((serie) => {
                        if(reservation.office_reservation.office_category.name === serie.name){
                            const month = new Date(reservation.date).getMonth()+1
                            const index = monthNum.indexOf(month)
                            serie.data[index] += reservation.amount
                            return
                        }
                    })
                    break
                }
            }
        })
        return res.status(200).json({cities: dataChart, categories: monthText});
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = adminChart