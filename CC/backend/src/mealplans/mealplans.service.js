const MealPlansModel = require("./mealplans.model")

// GET
const getMealPlans = async (account_id) => {
    const dataMealPlans = await MealPlansModel.getMealPlans(account_id)

    return dataMealPlans
}

//Create
const createMealPlan = async (account_id, recipe_id) => {
    if(!recipe_id){
        throw Error("recipe_id is required")
    }

    const dataRecipeById = await MealPlansModel.findRecipeById(recipe_id)

    if (!dataRecipeById) {
        throw Error("Recipe not found");
    }

    const findMealPlanOnProfile = await MealPlansModel.findMealPlansById(account_id, recipe_id)

    if(findMealPlanOnProfile){
        throw Error("Recipe exist on Meal Plan");
    }

    const dataNutritionOnProfile = await MealPlansModel.findNutrition(account_id)

    //Calculate Nutrition
    const total_calories_value = dataNutritionOnProfile.calories_value + dataRecipeById.calories_value
    const total_sugar_value = dataNutritionOnProfile.sugar_value + dataRecipeById.sugar_value
    const total_cholesterol_value = dataNutritionOnProfile.cholesterol_value + dataRecipeById.cholesterol_value
    const total_natrium_value = dataNutritionOnProfile.natrium_value + dataRecipeById.natrium_value

    const updateNutritionOnProfile = await MealPlansModel.updateNutritionOnProfile(
        account_id, 
        total_calories_value,
        total_sugar_value,
        total_cholesterol_value,
        total_natrium_value
    )

    const dataMealPlan = await MealPlansModel.createMealPlan(account_id, recipe_id)

    return dataMealPlan
}

const updateMealPlan = async (account_id, old_recipe_id, recipe_id) => {
    if(!recipe_id){
        throw Error("recipe_id is required")
    }

    const dataMealPlans = await MealPlansModel.findMealPlansById(account_id, old_recipe_id)

    if(!dataMealPlans){
        throw Error("MealPlan is not exist")
    }

    const dataOldRecipebyId = await MealPlansModel.findRecipeById(old_recipe_id)
    
    if (!dataOldRecipebyId) {
        throw Error("Recipe on MealPlan not found");
    }

    const dataNewRecipebyId = await MealPlansModel.findRecipeById(recipe_id)
    
    if (!dataNewRecipebyId) {
        throw Error("Recipe not found");
    }
    
    const dataUpdateMealPlan = await MealPlansModel.updateMealPlan(account_id, old_recipe_id, recipe_id)

    const dataNutritionOnProfile = await MealPlansModel.findNutrition(account_id)

    //Calculate Nutrition
    const total_calories_value = (dataNutritionOnProfile.calories_value - dataOldRecipebyId.calories_value) + dataNewRecipebyId.calories_value
    const total_sugar_value = (dataNutritionOnProfile.sugar_value - dataOldRecipebyId.sugar_value) + dataNewRecipebyId.sugar_value
    const total_cholesterol_value = (dataNutritionOnProfile.cholesterol_value - dataOldRecipebyId.cholesterol_value) + dataNewRecipebyId.cholesterol_value
    const total_natrium_value = (dataNutritionOnProfile.natrium_value - dataOldRecipebyId.natrium_value) + dataNewRecipebyId.natrium_value

    const updateNutritionOnProfile = await MealPlansModel.updateNutritionOnProfile(
        account_id, 
        total_calories_value,
        total_sugar_value,
        total_cholesterol_value,
        total_natrium_value
    )

    return dataUpdateMealPlan
    
}

const deleteMealPlan = async (account_id, recipe_id) => {
    if(!recipe_id){
        throw Error("recipe_id is required")
    }
    
    const dataMealPlans = await MealPlansModel.findMealPlansById(account_id, recipe_id)

    if(!dataMealPlans){
        throw Error("MealPlan is not exist")
    }

    const dataRecipebyId = await MealPlansModel.findRecipeById(recipe_id)
    
    if (!dataRecipebyId) {
        throw Error("Recipe not found");
    }

    const dataDeleteMealPlan = await MealPlansModel.deleteMealPlan(account_id, recipe_id)
    
    const dataNutritionOnProfile = await MealPlansModel.findNutrition(account_id)

    //Calculate Nutrition
    const total_calories_value = dataNutritionOnProfile.calories_value - dataRecipebyId.calories_value 
    const total_sugar_value = dataNutritionOnProfile.sugar_value - dataRecipebyId.sugar_value
    const total_cholesterol_value = dataNutritionOnProfile.cholesterol_value - dataRecipebyId.cholesterol_value
    const total_natrium_value = dataNutritionOnProfile.natrium_value - dataRecipebyId.natrium_value 

    const updateNutritionOnProfile = await MealPlansModel.updateNutritionOnProfile(
        account_id, 
        total_calories_value,
        total_sugar_value,
        total_cholesterol_value,
        total_natrium_value
    )

    return dataDeleteMealPlan
    
}

module.exports = {
    getMealPlans,
    createMealPlan,
    updateMealPlan,
    deleteMealPlan,
}