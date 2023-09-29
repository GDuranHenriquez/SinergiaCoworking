const {Service} = require('../../db')

const postServices = async (req, res) => {
    try {
        const {name} = req.body
        if(!name){
            return res.status(401).json({error: 'The name must be provided'})
        }
        const [service, created] = await Service.findOrCreate({where: {name}})
        if(!created){
            return res.status(403).json({error: 'The service provided is already registered'})
        }
        return res.status(200).json(service)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = {postServices};