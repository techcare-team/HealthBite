const MealPlansService = require("./mealplans.service")

const getMealPlans = async (req, res) => {
    try{
        const account_id = req.userData.account_id
        const dataMealPlans = await MealPlansService.getMealPlans(account_id)
        
        return res.status(200).json({
            success: true,
            message : "Get MealPlans Success!",
            data: dataMealPlans
        })
    } catch (error) {
        console.error("Server Error di Controller MealPlans, Function getMealPlans");
        res.status(500).json({
            message: "Server error",
            serverMessage: error.message,
        });
    }
}

const createMealPlan = async (req, res) => {
    try {
        const account_id = req.userData.account_id
        const recipe_id = req.body.recipe_id

        const dataMealPlan = await MealPlansService.createMealPlan(account_id, recipe_id)

        return res.status(200).json({
            success: true,
            message : "Add Recipe to MealPlan Success!",
            data: dataMealPlan
        }
        )
    } catch (error) {
        if(error.message == "recipe_id is required"){
            return res.status(400).json({
                success: false,
                code: 400,
                message: error.message
            })
        }
        if(error.message == "Recipe exist on Meal Plan"){
            return res.status(400).json({
                success: false,
                code: 400,
                message: error.message
            })
        }
        if(error.message == "Recipe not found"){
            return res.status(404).json({
                success: false,
                code: 404,
                message: error.message
            })
        }
        console.error("Server Error di Controller MealPlans, Function createMealPlan");
        res.status(500).json({
            message: "Server error",
            serverMessage: error.message,
        });
    }
}

const updateMealPlan = async (req, res) => {
    try {
        const account_id = req.userData.account_id
        const old_recipe_id = parseInt(req.body.recipe_id)
        const recipe_id = req.body.recipe_id
        const dataUpdateMealPlan = await MealPlansService.updateMealPlan(account_id, old_recipe_id, recipe_id)
        
        return res.status(200).json({
            success : true,
            message : "Update MealPlans Success!",
            data: dataUpdateMealPlan
        })
    } catch (error) {
        if(error.message == "recipe_id is required"){
            return res.status(400).json({
                success: false,
                code: 400,
                message: error.message
            })
        }
        if(error.message == "MealPlan is not exist"){
            return res.status(404).json({
                success: false,
                code: 404,
                message: error.message
            })
        }
        if(error.message == "Recipe on MealPlan is not exist"){
            return res.status(404).json({
                success: false,
                code: 404,
                message: error.message
            })
        }
        if(error.message == "Recipe not found"){
            return res.status(404).json({
                success: false,
                code: 404,
                message: error.message
            })
        }
        console.error("Server Error di Controller MealPlans, Function updateMealPlan");
        res.status(500).json({
            message: "Server error",
            serverMessage: error.message,
        });
    }
}

const deleteMealPlan = async (req, res) => {
    try {
        const account_id = req.userData.account_id
        const recipe_id = parseInt(req.body.recipe_id)
    
        const dataDeleteMealPlan = await MealPlansService.deleteMealPlan(account_id, recipe_id)
        
        return res.status(200).json({
            success: true,
            message: "Delete MealPlan Success",
            data: dataDeleteMealPlan

        })

    } catch (error) {
        if(error.message == "recipe_id is required"){
            return res.status(400).json({
                success: false,
                code: 400,
                message: error.message
            })
        }
        if(error.message == "MealPlan is not exist"){
            return res.status(404).json({
                success: false,
                code: 404,
                message: error.message
            })
        }
        if(error.message == "Recipe not found"){
            return res.status(404).json({
                success: false,
                code: 404,
                message: error.message
            })
        }
        console.error("Server Error di Controller MealPlans, Function deleteMealPlan");
        return res.status(500).json({
            message: "Server error",
            serverMessage: error.message,
        });
    }    
}

module.exports = {
    getMealPlans,
    createMealPlan,
    updateMealPlan,
    deleteMealPlan,
}