const {Province, City} = require('../../db')

const getProvinces = async (req, res) => {
    try {
        const provinces = await Province.findAll({include: [{model: City, as: 'city_province'}]})
        return res.status(200).json(provinces)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = getProvinces