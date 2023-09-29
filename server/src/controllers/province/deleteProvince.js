const {Province} = require('../../db')

const deleteProvince = async (req, res) => {
    try {
        const {provinceId} = req.params
        if(!province){
            return res.status(401).json({error: 'The province id must be provided'})
        }
        const province = await Province.findByPk(provinceId)
        if(!province){
            return res.status(404).json({error: 'Province not found'})
        }
        await province.destroy()
        return res.status(200).json({msg: 'Province Deleted'})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = deleteProvince