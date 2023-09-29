const {Office} = require("../../db");

const deleteOffice = async (req, res) =>{
    const { id } = req.params;
    try {
        const office = await Office.findByPk(id);
        if(!office.name || office.deleted) {
            return res.status(404).json({message: 'Office not found'});
        }
        await office.update({deleted: true});
        return res.json({msg: 'Office Deleted'});
    } catch (error) {
        return res.status(500).json({message: `Something went wrong: ${error.message}`});
    }
}

module.exports = deleteOffice;