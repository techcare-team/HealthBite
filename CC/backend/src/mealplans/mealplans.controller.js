const MealPlansService = require("./mealplans.service")

const getMealPlans = async (req, res) => {
    try{
        const account_id = req.userData.account_id
        const dataMealPlans = await MealPlansService.getMealPlans(account_id)
        
        return res.status(200).json({
            message : "GET MealPlans Success!",
            data: dataMealPlans
        }
        )
    } catch (error) {
        console.error("Server Error di Controller MealPlans, Function getMealPlans");
        res.status(500).json({
            message: "Server error",
            serverMessage: error.message,
        });
    }
}

const deleteMealPlan = async (req, res) => {
    try {
        const account_id = req.userData.account_id
        const recipe_id = parseInt(req.params.id)
    
        await MealPlansService.deleteMealPlan(account_id, recipe_id)
    
        
        return res.status(200).json({
            message: "Delete MealPlans Success"
        })

    } catch (error) {
        if(error.message == "MealPlans is not exist"){
            return res.status(404).json({
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
    deleteMealPlan,
}