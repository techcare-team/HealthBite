const express = require('express')

//Import Controller
const SettingsController = require("../profile/profile.controller")

const router = express.Router()

//Routes

//GET
// import function dari controller (contoh: SettingsController.getProfile)
router.get('/profile', SettingsController.getHomeProfile) 

//UPDATE
router.put("/profile", SettingsController.updateProfile);

module.exports = router