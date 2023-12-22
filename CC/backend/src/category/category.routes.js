const express = require('express')

const CategoriesController = require("./category.controller")

const router = express.Router()

//Routes

//CREATE
router.post('/', CategoriesController.createCategory)

// READ
router.get('/', CategoriesController.getCategories)
router.get('/:id', CategoriesController.getCategoryById)

//UPDATE
router.put('/:id', CategoriesController.updateCategory)

//DELETE
router.delete('/:id', CategoriesController.deleteCategory)


module.exports = router