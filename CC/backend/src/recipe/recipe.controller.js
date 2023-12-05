const RecipesService = require("./recipe.service")

//GET
const getRecipes = async (req, res) => {
    try{
        const account_id = req.userData.account_id
        let { ingredients, recipe_name, categories_name } = req.query
        
        const dataRecipesByProfileRecommendation = await RecipesService.getRecipes(account_id, ingredients, recipe_name, categories_name)
        
        
        res.status(200).json({
            message: "get data Recipes success",
            data: dataRecipesByProfileRecommendation
        })
    } catch (error) {
        console.error("Server Error di Controller Recipes, Function getRecipes");
        console.error(error)
        res.status(500).json({
            message: "Server error",
            serverMessage: error,
        });
    }
}

const getRecipebyId = async (req, res) => {
    try {
        const account_id = req.userData.account_id
        const recipe_id = parseInt(req.params.id)
        const {
            dataRecommendation, 
            dataNutrition, 
            dataRecipebyId, 
            arrayOtherNutrients, 
            arrayIngredients, 
            arrayTools,
            arraySteps
        } = await RecipesService.getRecipebyId(account_id, recipe_id)

        res.status(200).json({
            message: "GET Recipe by Id Success",
            data: {
                recipe: {
                    recipe_id: dataRecipebyId.recipe_id,
                    recipe_photo: dataRecipebyId.recipe_photo,
                    recipe_name: dataRecipebyId.recipe_name,
                    description: dataRecipebyId.description,
                    calories_value: dataRecipebyId.calories_value,
                    sugar_value: dataRecipebyId.sugar_value,
                    cholesterol_value: dataRecipebyId.cholesterol_value,
                    natrium_value: dataRecipebyId.natrium_value,
                    other_nutrients: arrayOtherNutrients,
                    ingredients: arrayIngredients,
                    tools: arrayTools,
                    steps: arraySteps
                }, 
                Recommendation: {
                    recommendation: dataRecommendation.user_recommendation_value
                },
                ProfileNutrition: {
                    calories_value: dataNutrition.calories_value,
                    calories_max_value: dataNutrition.calories_max_value,
                    sugar_value: dataNutrition.sugar_value,
                    sugar_max_value: dataNutrition.sugar_max_value,
                    cholesterol_value: dataNutrition.cholesterol_value,
                    cholesterol_max_value: dataNutrition.cholesterol_max_value,
                    natrium_value: dataNutrition.natrium_value,
                    natrium_max_value: dataNutrition.natrium_max_value
                }

                
            }
        })
    } catch (error) {
        console.error("Server Error di Controller Recipes, Function getRecipebyId");
        res.status(500).json({
            message: "Server error",
            serverMessage: error,
        });
    }
}

//POST
const addRecipeforMealPlans = async (req, res) => {
    try {
        const account_id = req.userData.account_id
        const recipe_id = parseInt(req.params.id)
        const RecipeForMealPlans = await RecipesService.addRecipeforMealPlans(account_id, recipe_id)

       
        res.status(200).json({
            message: "POST Recipe for MealPlans Success",
            data: RecipeForMealPlans
        })
    } catch (error) {
        console.error("Server Error di Controller Recipes, Function addRecipeforMealPlan");
        res.status(500).json({
            message: "Server error",
            serverMessage: error,
        });
    }
}

module.exports = {
    getRecipes,
    getRecipebyId,
    addRecipeforMealPlans,
}