const { User } = require("../../db");

const deleteUser = async (req, res) => {
    const {userId} = req.params;
    try {
        const user = await User.findByPk(userId);
        if(!user.name || user.deleted) {
            return res.status(404).json({msg: "Product not found"});
        }
        await user.update({deleted: true});
        return res.json({msg: "Product Deleted"});
    } catch (error) {
        return res.status(500).json({msg: `Something went wrong: ${error.message}`});
    }
};

module.exports = {deleteUser};