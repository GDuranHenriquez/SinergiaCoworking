const {Category} = require('../../db')

const postCategory = async (req, res) => {
    try {
        const {name} = req.body
        if(!name){
            return res.status(401).json({error: 'No se indicó el nombre'})
        }
        const [category, created] = await Category.findOrCreate({where: {name}})
        if(!created) {
            return res.status(401).json({error: 'La categoria ya está registrada'})
        }
        return res.status(200).json(category)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = postCategory