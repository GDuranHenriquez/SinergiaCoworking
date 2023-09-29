const {Router} = require('express')
const postCategory = require('../controllers/category/postCategory')
const getCategories = require('../controllers/category/getCategories')
const deleteCategory = require('../controllers/category/deleteCategory')

const routerCategory = Router()

routerCategory.get("/", getCategories)
routerCategory.post("/", postCategory)
routerCategory.delete("/:id", deleteCategory)

module.exports = routerCategory