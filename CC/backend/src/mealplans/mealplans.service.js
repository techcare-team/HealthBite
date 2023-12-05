const MealPlansModel = require("./mealplans.model")

// GET
const getMealPlans = async (account_id) => {
    const dataMealPlans = await MealPlansModel.getMealPlans(account_id)

    return dataMealPlans
}

const deleteMealPlan = async (account_id, recipe_id) => {
    const dataMealPlans = await MealPlansModel.findMealPlansById(account_id, recipe_id)
    
    if(!dataMealPlans){
        throw Error("MealPlans is not exist")
    }
    
    await MealPlansModel.deleteMealPlan(account_id, recipe_id)
    
}

module.exports = {
    getMealPlans,
    deleteMealPlan,
}