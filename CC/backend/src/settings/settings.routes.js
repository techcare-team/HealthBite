const express = require('express')

//Import Controller
const ProfileSettingsController = require('./settings.controller');

const router = express.Router()

//Routes

//GET
// import function dari controller (contoh: SettingsController.getProfile)
router.get('/profile/:profile_id', ProfileSettingsController.getProfileSettings);

//UPDATE
router.put('/profile', ProfileSettingsController.updateProfileSettings);

module.exports = router