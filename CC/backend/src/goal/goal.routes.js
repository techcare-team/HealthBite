const express = require('express')

const isAdmin = require("../middleware/isAdmin")
const GoalsController = require("./goal.controller")

const router = express.Router()

//Routes

//CREATE
router.post('/', GoalsController.createGoal)

// READ
router.get('/', GoalsController.getGoals)
router.get('/:id', GoalsController.getGoalById)

//UPDATE
router.put('/:id', GoalsController.updateGoal)

//DELETE
router.delete('/:id', GoalsController.deleteGoal)


module.exports = router