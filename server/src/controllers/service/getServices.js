const {Service} = require('../../db')

const getServices = async (req, res) => {
    try {
        const services = await Service.findAll()
        return res.status(200).json(services)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.export = getServices