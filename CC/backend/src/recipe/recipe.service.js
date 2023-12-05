const RecipesModel = require("./recipe.model")

const TexttoArray = (text) => {
    try {  
        return text.split(',')
    } catch (error) {
        return text
    }
}

//GET
const getRecipes = async (account_id, ingredients, recipe_name, categories_name) => {
    const dataRecipes = await RecipesModel.findRecipes()
    const dataNutrition = await RecipesModel.findNutrition(account_id)

    for (const recipe of dataRecipes) {
        if(
            dataNutrition.calories_value + recipe.calories_value > dataNutrition.calories_max_value ||
            dataNutrition.sugar_value + recipe.sugar_value > dataNutrition.sugar_max_value ||
            dataNutrition.cholesterol_value + recipe.cholesterol_value > dataNutrition.cholesterol_max_value ||
            dataNutrition.natrium_value + recipe.natrium_value > dataNutrition.natrium_max_value
        ){
            await RecipesModel.updateRecipesRecommendationFalse(account_id, recipe.recipe_id)

        } else {
            await RecipesModel.updateRecipesRecommendationTrue(account_id, recipe.recipe_id) 
        }
    }

    const filter = {};
    
    if (ingredients) {
        // Split the ingredients into an array
        const ingredientsArray = ingredients.split(',');

        filter.AND = ingredientsArray.map((ingredient) => ({
            ingredients: { contains: ingredient.trim() },
        }));
    }

    if (recipe_name) {
        filter.recipe_name = {
            contains: recipe_name,
            mode: 'insensitive',
        };
    }

    if (categories_name) {
        const categories_nameArray = categories_name.split(',').map((category_name) => category_name);
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
    const dataNutrition = await RecipesModel.findNutrition(account_id)
    const dataRecipebyId = await RecipesModel.findRecipeById(recipe_id)

    if (!dataRecipebyId) {
        throw Error("Recipe not found");
    }

    // Convert Text to Array
    arrayOtherNutrients = TexttoArray(dataRecipebyId.other_nutrients)
    arrayIngredients = TexttoArray(dataRecipebyId.ingredients)
    arrayTools = TexttoArray(dataRecipebyId.tools)
    arraySteps = TexttoArray(dataRecipebyId.steps)

    return {
        dataRecommendation, 
        dataNutrition, 
        dataRecipebyId, 
        arrayOtherNutrients, 
        arrayIngredients, 
        arrayTools,
        arraySteps
    }
}

//POST
const addRecipeforMealPlans = async (account_id, recipe_id) => {
    
    const RecipeForMealPlans = await RecipesModel.createMealPlan(account_id, recipe_id)

    return RecipeForMealPlans
}

module.exports = {
    getRecipes,
    getRecipebyId,
    addRecipeforMealPlans,
}