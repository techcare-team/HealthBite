const express = require('express')

const RecipesController = require("./recipe.controller")
const uploadRecipe = require('../middleware/multer')
const recipeValidation = require('../middleware/recipeValidation')
const isAdmin = require("../middleware/isAdmin")

const router = express.Router()

//Routes

//GET
router.get('/', RecipesController.getRecipes)

router.get('/ai', RecipesController.getRecipebyAi)

router.get('/:id', RecipesController.getRecipebyId)


//Create
router.post('/', isAdmin, uploadRecipe.single('recipe_photo'), recipeValidation, RecipesController.addRecipe)

//Update
router.put('/:id', isAdmin, uploadRecipe.single('recipe_photo'), recipeValidation, RecipesController.updateRecipeById)

router.patch('/:id', isAdmin, RecipesController.updatePhotoRecipeById)

//Delete
router.delete('/:id', isAdmin, RecipesController.deleteRecipeById)

module.exports = router