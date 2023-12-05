const express = require('express')

const AuthController = require("./auth.controller")

const router = express.Router()

const accessValidation = require("../middleware/accessValidation")

//Routes
router.post('/register', AuthController.createAccount)
router.post('/login', AuthController.loginAccount)
router.post('/logout', accessValidation, AuthController.logoutAccount)

module.exports = router