const {Category} = require('../../db')

const deleteCategory = async (req, res) => {
    try {
        const {categoryId} = req.params
        if(!category){
            return res.status(401).json({error: 'The category id must be provided'})
        }
        const category = await Category.findByPk(categoryId)
        if(!category){
            return res.status(404).json({error: 'Category not found'})
        }
        await category.destroy()
        return res.status(200).json({msg: 'Category Deleted'})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = deleteCategory