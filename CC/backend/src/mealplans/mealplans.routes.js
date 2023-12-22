const express = require('express')

const MealPlansController = require("./mealplans.controller")

const router = express.Router()

//Routes
router.get('/', MealPlansController.getMealPlans)

router.post('/', MealPlansController.createMealPlan)

router.put('/', MealPlansController.updateMealPlan)

router.delete('/', MealPlansController.deleteMealPlan)


module.exports = router