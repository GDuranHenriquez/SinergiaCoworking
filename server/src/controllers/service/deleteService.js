const {Service, Office} = require('../../db')

const deleteService = async (req, res) => {
    try {
        const {id} = req.params
        if(!id){
            return res.status(401).json({error: 'No se indico el id del servicio'})
        }
        const service = await Service.findByPk(id)
        if(!service){
            return res.status(404).json({error: 'No se encontro el servicio'})
        }
        const checkOffice = await service.getOffices()
        if(checkOffice.length > 0){
            return res.status(400).json({error: `Existen ${checkOffice.length} oficinas que continen dicho servicio, modifiquelas y vuelva a intentar`})
        }
        await service.destroy()
        return res.status(200).json({msg: 'Servicio eliminado'})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = {deleteService}