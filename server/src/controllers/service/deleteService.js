const {Service} = require('../../db')

const deleteService = async (req, res) => {
    try {
        const {serviceId} = req.params
        if(!service){
            return res.status(401).json({error: 'The service id must be provided'})
        }
        const service = await Service.findByPk(serviceId)
        if(!service){
            return res.status(404).json({error: 'Service not found'})
        }
        await service.destroy()
        return res.status(200).json({msg: 'Service Deleted'})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = deleteService