const {Province} = require('../../db')

const postProvince = async (req, res) => {
    try {
        const {name} = req.body
        if(!name){
            return res.status(401).json({error: 'No se indicó el nombre'})
        }
        const [province, created] = await Province.findOrCreate({where: {name}})
        if(!created) {
            return res.status(401).json({error: 'La provincia ya está registrada'})
        }
        return res.status(200).json(province)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = postProvince