const express = require('express')

const ProfileController = require("./profile.controller")
const profileValidationInput = require("../middleware/profileValidation")

const router = express.Router()

//Routes
router.get('/', ProfileController.getHomeProfile);

router.post('/', profileValidationInput, ProfileController.createProfileAndNutrition)


module.exports = router