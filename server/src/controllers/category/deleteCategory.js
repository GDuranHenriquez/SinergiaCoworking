const {Category, Office} = require('../../db')

const deleteCategory = async (req, res) => {
    try {
        const {categoryId} = req.params
        if(!category){
            return res.status(401).json({error: 'The category id must be provided'})
        }
        const checkOffice = await Office.findAll({where:{category: categoryId, deleted: false}})
        if(checkOffice.length){
            return res.status(401).json({error: `Existen ${checkOffice.length} oficinas relacionadas con la categoria. Cambielas de categoria o elimine las oficinas y vuelva a intentarlo`})
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