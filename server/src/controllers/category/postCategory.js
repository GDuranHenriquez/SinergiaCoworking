const {Category} = require('../../db')

const postCategory = async (req, res) => {
    try {
        const {name} = req.body
        if(!name){
            return res.status(401).json({error: 'A name must be provided'})
        }
        const [category, created] = await Category.findOrCreate({where: {name: name.toLowerCase()}})
        if(created) {
            return res.status(401).json({error: 'The category is already registered'})
        }
        return res.status(200).json(category)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.export = postCategory