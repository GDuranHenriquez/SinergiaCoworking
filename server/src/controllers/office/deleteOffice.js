const {Office} = require("../../db");

const deleteOffice = async (req, res) =>{
    const { id } = req.params;
    try {
        const office = await Office.findByPk(id);
        if(!office.name || office.deleted) {
            return res.status(404).json({message: 'No se encontró la oficina'});
        }
        await office.update({deleted: true});
        return res.json({msg: 'Oficina eliminada'});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = deleteOffice;