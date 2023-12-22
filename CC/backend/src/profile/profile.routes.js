const express = require('express')

const ProfileController = require("./profile.controller")
const profileValidationInput = require("../middleware/profileValidation")

const router = express.Router()

//Routes
router.put('/', profileValidationInput, ProfileController.updateProfileAndNutrition)


module.exports = router