const express = require('express')

const MealPlansController = require("./mealplans.controller")

const router = express.Router()

//Routes
router.get('/', MealPlansController.getMealPlans)

router.delete('/:id', MealPlansController.deleteMealPlan)


module.exports = router