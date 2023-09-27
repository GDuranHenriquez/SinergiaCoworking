const {Category} = require('../../db')

const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll()
        return res.status(200).json(categories)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = getCategories