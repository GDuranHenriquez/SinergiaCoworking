const {Office} = require("../../db");

const deleteOffice = async (req, res) =>{
    try {
        const { id } = req.params;
        if(!id){
            return res.status(401).json({error: 'Falta id oficina'})
        }
        const office = await Office.findByPk(id);
        if(!office) {
            return res.status(404).json({message: 'Oficina invalida'});
        }
        if(office.deleted){
            await office.update({deleted: false});
            return res.json({msg: 'Oficina restaurada'});
        }
        await office.update({deleted: true});
        return res.json({msg: 'Oficina eliminada'});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = deleteOffice;