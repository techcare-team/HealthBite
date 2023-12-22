const express = require('express')

const NutritionController = require("./nutrition.controller")

const router = express.Router()

//Routes
router.get('/', NutritionController.getNutrition);

module.exports = router