const express = require('express')

const RecipesController = require("./recipe.controller")

const router = express.Router()

//Routes
router.get('/', RecipesController.getRecipes)
router.get('/:id', RecipesController.getRecipebyId)

router.post('/:id', RecipesController.addRecipeforMealPlans)

module.exports = router