const GoalsService = require("./goal.service")

//GET
const getGoals = async (req, res) => {
    try{
        const dataGoals = await GoalsService.findGoals()
        
        return res.status(200).json({
            success: true,
            message : "GET Data Goals Success!",
            data: dataGoals
        })
    } catch (error) {
        console.error("Server Error di Controller goal, Function getGoals");
        return res.status(500).json({
            success: false,
            message: "Server error",
            serverMessage: error.message,
        });
    }
}

const getGoalById = async (req, res) => {
    try {
        const goal_id = parseInt(req.params.id)
        const dataGoal = await GoalsService.findGoalById(goal_id)

        return res.status(200).json({
            success: true,
            message : "GET Data Goal by id Success!",
            data: dataGoal
        })
    } catch (error) {
        if(error.message == "Id is missing"){
            return res.status(400).json({
                success: false,
                code : 400,
                message: error.message
            })
        }
        if(error.message == "Goal is not exist"){
            return res.status(404).json({
                success: false,
                code : 404,
                message: error.message,
            });
        }
        console.error("Server Error di Controller MealPlans, Function getGoalById");
        return res.status(500).json({
            success: false,
            code: 500,
            message: "Server error",
            serverMessage: error.message,
        });
    }
}


//CREATE
const createGoal = async (req, res) => {
    try {
        const {goal_name} = req.body

        const dataGoal = await GoalsService.createGoal(goal_name)

        return res.status(201).json({
            success: true,
            message : "CREATE Goal Success!",
            data: dataGoal
        })

    } catch (error) {
        if(error.message == "Goal already exist"){
            return res.status(404).json({
                success: false,
                code : 404,
                message: error.message,
            })
        }
        if(error.message == "goal_name field is missing"){
            return res.status(400).json({
                success: false,
                code : 400,
                message: error.message
            })
        }
        console.error("Server Error di Controller MealPlans, Function deleteMealPlan");
        return res.status(500).json({
            success: false,
            code: 500,
            message: "Server error",
            serverMessage: error.message,
        });
    }    
}

//UPDATE
const updateGoal = async (req, res) => {
    try {
        const goal_id = parseInt(req.params.id)
        const {goal_name} = req.body
        
        const dataUpdateGoal = await GoalsService.updateGoal(goal_id, goal_name)
        
        return res.status(200).json({
            success : true,
            message : "Update Goal Success!",
            data: dataUpdateGoal
        })
    } catch (error) {
        if(error.message == "Id is missing"){
            return res.status(400).json({
                success: false,
                code : 400,
                message: error.message
            })
        }
        if(error.message == "goal_name field is missing"){
            return res.status(400).json({
                success: false,
                code : 400,
                message: error.message
            })
        }
        if(error.message == "Goal is not exist"){
            return res.status(404).json({
                success: false,
                code : 404,
                message: error.message
            })
        }
        if(error.message == "Goal name already exist"){
            return res.status(404).json({
                success: false,
                code : 404,
                message: error.message
            })
        }
        console.error("Server Error di Controller goal, Function updateGoal");
        return res.status(500).json({
            success: false,
            code: 500,
            message: "Server error",
            serverMessage: error.message,
        })
    }
}

//DELETE
const deleteGoal = async (req, res) => {
    try {
        const goal_id = parseInt(req.params.id)
    
        const dataDeleteGoal = await GoalsService.deleteGoal(goal_id)

        return res.status(200).json({
            success: true,
            message: "Delete Goal Success",
            data: dataDeleteGoal
        })

    } catch (error) {
        if(error.message == "Id is missing"){
            return res.status(400).json({
                success: false,
                code : 400,
                message: error.message
            })
        }
        if(error.message == "Goal is not exist"){
            return res.status(404).json({
                success: false,
                code: 404,
                message: error.message,
            })
        }
        console.error("Server Error di Controller goal, Function deleteGoal");
        return res.status(500).json({
            success: false,
            code: 500,
            message: "Server error",
            serverMessage: error.message,
        })
    }    
}

module.exports = {
    getGoals,
    getGoalById,
    createGoal,
    updateGoal,
    deleteGoal,
}