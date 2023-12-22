const express = require('express')

//Import Controller
const SettingsController = require("../profile/profile.controller")
const AuthController = require("../auth/auth.controller")

const router = express.Router()
const profileValidationInput = require("../middleware/profileValidation")

//Routes

//GET
router.get('/', SettingsController.getProfile) 

router.get('/profile', SettingsController.getDetailProfile) 

//POST
router.post('/logout', AuthController.logoutAccount)

//UPDATE
router.put("/profile", profileValidationInput, SettingsController.updateProfileAndNutrition);

//Delete
router.delete('/', SettingsController.deleteProfile)


module.exports = router