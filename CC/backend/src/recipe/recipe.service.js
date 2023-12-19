const RecipesModel = require("./recipe.model")

//GET
const getRecipes = async (account_id, ingredients, recipe_name, categories, ai) => {
    const dataRecipes = await RecipesModel.findRecipes()
    const dataNutrition = await RecipesModel.findNutrition(account_id)

    const {
        calories_value,
        calories_max_value,
        sugar_value,
        sugar_max_value,
        cholesterol_value,
        cholesterol_max_value,
        natrium_value,
        natrium_max_value
    } = dataNutrition

    const calculateRecipeforRecommendationUser = await calculateStatusRecipeforUser(
        account_id,
        dataRecipes,       
        calories_value,
        calories_max_value,
        sugar_value,
        sugar_max_value,
        cholesterol_value,
        cholesterol_max_value,
        natrium_value,
        natrium_max_value
    )

    if (typeof ingredients === 'string') {
        ingredients = [ingredients];
    }

    if (typeof categories === 'string') {
        categories = [categories];
    }

    const filter = {};

    if (recipe_name) {
        filter.recipe_name = {
            contains: recipe_name,
            mode: 'insensitive',
        };
    }

    if(!ingredients && ai == "true"){
        const dataRecipeWithAi = await RecipesModel.findRecipeWithAI(recipe_name)

        if (!dataRecipeWithAi) {
            throw Error("Recipe not found");
        }
        const dataRecommendation = await RecipesModel.findProfileRecommendation(account_id, dataRecipeWithAi.recipe_id)

        const findMealPlanOnProfile = await RecipesModel.findMealPlanOnProfile(account_id, dataRecipeWithAi.recipe_id)
        let isMealPlanExist = false

        if(findMealPlanOnProfile){
            isMealPlanExist = true
        }

        return {dataRecipeWithAi, dataRecommendation, isMealPlanExist}
    }

    if (ingredients) {
        // Split the ingredients into an array
        filter.ingredients = {
            hasEvery: ingredients
        }
    }


    if (categories) {
        const categories_nameArray = categories.map((category_name) => category_name);
        filter.categories= {
            some: {
                category_name: {
                    in: categories_nameArray
                },
            },
        };
    }

    const dataRecipesByProfileRecommendation = await RecipesModel.findRecipesByProfileRecommendation(account_id, filter)
    
    return dataRecipesByProfileRecommendation
}

const getRecipebyId = async (account_id, recipe_id) => {
    const dataRecommendation = await RecipesModel.findProfileRecommendation(account_id, recipe_id)
    const dataRecipebyId = await RecipesModel.findRecipeById(recipe_id)
    const findMealPlanOnProfile = await RecipesModel.findMealPlanOnProfile(account_id, recipe_id)

    let isMealPlanExist = false

    if (!dataRecipebyId) {
        throw Error("Recipe not found");
    }

    if(!dataRecommendation){
        throw Error("Recommendation Profile not found")
    }

    if(findMealPlanOnProfile){
        isMealPlanExist = true
    }

    return {
        dataRecommendation, 
        dataRecipebyId, 
        isMealPlanExist
    }
}

const getRecipebyAi = async (account_id, recipe_name) => {
    if(!recipe_name){
        throw Error("recipe_name is required")
    } 

    // let filter = null

    // if(recipe_name){
    //     filter = {
    //         recipe_name :{
    //             contains: recipe_name,
    //             mode: 'insensitive',
    //         }
    //     };
    // }

    const dataRecipeWithAi = await RecipesModel.findRecipeWithAI(recipe_name)

    if (!dataRecipeWithAi) {
        throw Error("Recipe not found");
    }

    const dataRecommendation = await RecipesModel.findProfileRecommendation(account_id, dataRecipeWithAi.recipe_id)

    if(!dataRecommendation){
        throw Error("Recommendation Profile not found")
    }

    const findMealPlanOnProfile = await RecipesModel.findMealPlanOnProfile(account_id, dataRecipeWithAi.recipe_id)

    let isMealPlanExist = false

    if(findMealPlanOnProfile){
        isMealPlanExist = true
    }

    return {dataRecipeWithAi, dataRecommendation, isMealPlanExist}
}
//CREATE
const addRecipe = async (
    recipe_photo,
    recipe_name,
    serving_size,
    description,
    calories_value,
    sugar_value,
    cholesterol_value,
    natrium_value,
    other_nutrients,
    ingredients,
    detail_ingredients,
    steps,
    data_categories
) => 
{
    const isRecipeExist = await RecipesModel.findRecipeByName(recipe_name)

    if (isRecipeExist) {
        throw Error("recipe name is already in use");
    }

    const findAccountsId = await RecipesModel.findAccount()
    
    let accountIdArray = []

    if (Array.isArray(findAccountsId) && findAccountsId.length > 0) {
        accountIdArray = findAccountsId.map(item => item.account_id);
    }
    
    const addRecipe = await RecipesModel.createRecipe(
        recipe_photo,
        recipe_name,
        serving_size,
        description,
        calories_value,
        sugar_value,
        cholesterol_value,
        natrium_value,
        other_nutrients,
        ingredients,
        detail_ingredients,
        steps,
        data_categories,
        accountIdArray
    )
    
    return addRecipe
}

//UPDATE
const updateRecipeById = async (
    recipe_id,
    recipe_photo,
    recipe_name,
    serving_size,
    description,
    calories_value,
    sugar_value,
    cholesterol_value,
    natrium_value,
    other_nutrients,
    ingredients,
    detail_ingredients,
    steps,
    data_categories
) => 
{
    const findCategoriesOnRecipe = await RecipesModel.findCategoriesOnRecipe(recipe_id)

    if(findCategoriesOnRecipe.length > 0){
        const deleteCategoriesFromRecipe = await RecipesModel.deleteCategoriesOnRecipe(recipe_id)
    }

    const updateRecipe = await RecipesModel.updateRecipeById(
        recipe_id,
        recipe_photo,
        recipe_name,
        serving_size,
        description,
        calories_value,
        sugar_value,
        cholesterol_value,
        natrium_value,
        other_nutrients,
        ingredients,
        detail_ingredients,
        steps,
        data_categories,
    )
    
    return updateRecipe
}

//DELETE
const deleteRecipeById = async (recipe_id, account_id) => {
    const dataRecipebyId = await RecipesModel.findRecipeById(recipe_id)
    
    if (!dataRecipebyId) {
        throw Error("Recipe not found");
    }
    
    const findCategoriesOnRecipe = await RecipesModel.findCategoriesOnRecipe(recipe_id)

    if(findCategoriesOnRecipe.length > 0){
        const deleteCategoriesFromRecipe = await RecipesModel.deleteCategoriesOnRecipe(recipe_id)
    }

    const findProfileRecommendationOnRecipe = await RecipesModel.findProfileRecommendationOnRecipe(recipe_id)

    if(findProfileRecommendationOnRecipe.length > 0){
        const deleteProfileRecommendationOnRecipe = await RecipesModel.deleteProfileRecommendationOnRecipe(recipe_id)
    }

    const findRecipeOnMealPlan = await RecipesModel.findMealPlanOnProfile(account_id, recipe_id)

    if(findRecipeOnMealPlan){
        const deleteRecipeOnMealPlan = await RecipesModel.deleteMealPlan(account_id, recipe_id)
    }

    const dataDeleteRecipeById = await RecipesModel.deleteRecipeById(recipe_id)

    return dataDeleteRecipeById
}

//Function for Calculate Recipe For Recommendation User
const calculateStatusRecipeforUser = async (
    account_id,
    dataRecipes,       
    calories_value,
    calories_max_value,
    sugar_value,
    sugar_max_value,
    cholesterol_value,
    cholesterol_max_value,
    natrium_value,
    natrium_max_value
    ) => {

    const limitCalories = Math.ceil((calories_max_value * 80) / 100)
    const limitSugar =  Math.ceil((sugar_max_value * 80) / 100)
    const limitCholesterol = Math.ceil((cholesterol_max_value * 80) / 100)
    const limitNatrium =  Math.ceil((natrium_max_value * 80) /100)

    let statusCalories = null
    let statusSugar = null
    let statusCholesterol = null
    let statusNatrium = null
    let totalStatus = null

    let total_calories_value = null
    let total_sugar_value = null
    let total_cholesterol_value = null
    let total_natrium_value = null

    let statusArray = []
    
    for (const recipe of dataRecipes) {
        //Status Calories
        total_calories_value = calories_value + recipe.calories_value
        total_sugar_value = sugar_value + recipe.sugar_value
        total_cholesterol_value = cholesterol_value + recipe.cholesterol_value
        total_natrium_value = natrium_value + recipe.natrium_value

        if(total_calories_value <= limitCalories){
            statusCalories = "Aman"
            statusArray.push("Aman")
        } else if (total_calories_value > limitCalories && total_calories_value < calories_max_value ){
            statusCalories = "Kurang Direkomendasikan"
            statusArray.push("Kurang Direkomendasikan")
        } else {
            statusCalories = "Tidak Direkomendasikan"
            statusArray.push("Tidak Direkomendasikan")
        }

        //Status Sugar
        if(total_sugar_value <= limitSugar){
            statusSugar = "Aman"
            statusArray.push("Aman")
        } else if (total_sugar_value > limitSugar && total_sugar_value < sugar_max_value ){
            statusSugar = "Kurang Direkomendasikan"
            statusArray.push("Kurang Direkomendasikan")
        } else {
            statusSugar = "Tidak Direkomendasikan"
            statusArray.push("Tidak Direkomendasikan")
        }
    
        //Status Cholesterol
        if(total_cholesterol_value <= limitCholesterol){
            statusCholesterol = "Aman"
            statusArray.push("Aman")
        } else if (total_cholesterol_value > limitCholesterol && total_cholesterol_value < cholesterol_max_value ){
            statusCholesterol = "Kurang Direkomendasikan"
            statusArray.push("Kurang Direkomendasikan")
        } else {
            statusCholesterol = "Tidak Direkomendasikan"
            statusArray.push("Tidak Direkomendasikan")
        }
    
        //Status Natrium
        if(total_natrium_value <= limitNatrium){
            statusNatrium = "Aman"
            statusArray.push("Aman")
        } else if (total_natrium_value > limitNatrium && total_natrium_value < natrium_max_value ){
            statusNatrium = "Kurang Direkomendasikan"
            statusArray.push("Kurang Direkomendasikan")
        } else {
            statusNatrium = "Tidak Direkomendasikan"
            statusArray.push("Tidak Direkomendasikan")
        }

        if (statusArray.includes("Tidak Direkomendasikan")) {
            totalStatus = "Tidak Direkomendasikan"
        } else if (statusArray.includes("Kurang Direkomendasikan")) {
            totalStatus = "Kurang Direkomendasikan";
        } else {
            totalStatus = "Aman"
        }

        await RecipesModel.updateRecipesRecommendation(
            account_id, 
            recipe.recipe_id,
            statusCalories,
            statusSugar,
            statusCholesterol,
            statusNatrium,
            totalStatus  
        )

        statusCalories = null
        statusSugar = null
        statusCholesterol = null
        statusNatrium = null
        totalStatus = null

        total_calories_value = null
        total_sugar_value = null
        total_cholesterol_value = null
        total_natrium_value = null

        statusArray.splice(0, statusArray.length);
    }
}


module.exports = {
    getRecipes,
    getRecipebyId,
    getRecipebyAi,
    addRecipe,
    updateRecipeById,
    deleteRecipeById
}