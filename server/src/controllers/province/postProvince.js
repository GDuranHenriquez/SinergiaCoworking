const {Province} = require('../../db')

const postProvince = async (req, res) => {
    try {
        const {name} = req.body
        if(!name){
            return res.status(401).json({error: 'A name must be provided'})
        }
        const [province, created] = await Province.findOrCreate({where: {name: name.toLowerCase()}})
        if(created) {
            return res.status(401).json({error: 'The province is already registered'})
        }
        return res.status(200).json(province)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = postProvince