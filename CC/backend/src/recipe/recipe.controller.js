const RecipesService = require("./recipe.service")

//GET
const getRecipes = async (req, res) => {
    try{
        const account_id = req.userData.account_id
        const { ingredients, recipe_name, categories, ai } = req.query

        if(!ingredients && ai == "true"){
            const {dataRecipeWithAi, dataRecommendation, isMealPlanExist} = await RecipesService.getRecipes(account_id, ingredients, recipe_name, categories, ai)
            return res.status(200).json({
                success: true,
                message: "GET Data Recipes from AI Success!",
                data: {
                    recipe: {
                        recipe_id: dataRecipeWithAi.recipe_id,
                        recipe_photo: dataRecipeWithAi.recipe_photo,
                        recipe_name: dataRecipeWithAi.recipe_name,
                        serving_size: dataRecipeWithAi.serving_size,
                        description: dataRecipeWithAi.description,
                        calories_value: dataRecipeWithAi.calories_value,
                        sugar_value: dataRecipeWithAi.sugar_value,
                        cholesterol_value: dataRecipeWithAi.cholesterol_value,
                        natrium_value: dataRecipeWithAi.natrium_value,
                        other_nutrients: dataRecipeWithAi.other_nutrients,
                        ingredients: dataRecipeWithAi.ingredients,
                        steps: dataRecipeWithAi.steps
                    }, 
                    Recommendation: dataRecommendation.user_recommendation_value,
                    isMealPlanExist
                }
            })
        }
        const dataRecipesByProfileRecommendation = await RecipesService.getRecipes(account_id, ingredients, recipe_name, categories, ai)
        
        return res.status(200).json({
            success: true,
            message: "GET Data Recipes Success!",
            data: dataRecipesByProfileRecommendation
        })
    } catch (error) {
        if(error.message == "Recipe not found"){
            return res.status(404).json({
                success: false,
                code: 404,
                message: error.message
            });
        }
        console.error("Server Error di Controller Recipes, Function getRecipes");
        console.error(error)
        res.status(500).json({
            success: false,
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
            dataRecipebyId, 
            isMealPlanExist
        } = await RecipesService.getRecipebyId(account_id, recipe_id)

        return res.status(200).json({
            success: true,
            message: "GET Recipe by Id Success!",
            data: {
                recipe: {
                    recipe_id: dataRecipebyId.recipe_id,
                    recipe_photo: dataRecipebyId.recipe_photo,
                    recipe_name: dataRecipebyId.recipe_name,
                    serving_size: dataRecipebyId.serving_size,
                    description: dataRecipebyId.description,
                    calories_value: dataRecipebyId.calories_value,
                    sugar_value: dataRecipebyId.sugar_value,
                    cholesterol_value: dataRecipebyId.cholesterol_value,
                    natrium_value: dataRecipebyId.natrium_value,
                    other_nutrients: dataRecipebyId.other_nutrients,
                    ingredients: dataRecipebyId.detail_ingredients,
                    steps: dataRecipebyId.steps
                }, 
                Recommendation: dataRecommendation.user_recommendation_value,
                isMealPlanExist

                
            }
        })
    } catch (error) {
        if(error.message == "Recommendation Profile not found"){
            return res.status(400).json({
                success: false,
                code: 400,
                message: error.message
            });
        }
        if(error.message == "Recipe not found"){
            return res.status(404).json({
                success: false,
                code: 404,
                message: error.message
            });
        }
        console.error("Server Error di Controller Recipes, Function getRecipebyId");
        return res.status(500).json({
            success: false,
            message: "Server error",
            serverMessage: error.message,
        });
    }
}

const getRecipebyAi = async (req, res) => {
    try {
        const account_id = req.userData.account_id
        const recipe_name = req.body.recipe_name
        const {dataRecipeWithAi, dataRecommendation, isMealPlanExist} = await RecipesService.getRecipebyAi(account_id, recipe_name)

        return res.status(200).json({
            success: true,
            message: "GET Data Recipes from AI Success!",
            data: {
                recipe: {
                    recipe_id: dataRecipeWithAi.recipe_id,
                    recipe_photo: dataRecipeWithAi.recipe_photo,
                    recipe_name: dataRecipeWithAi.recipe_name,
                    serving_size: dataRecipeWithAi.serving_size,
                    description: dataRecipeWithAi.description,
                    calories_value: dataRecipeWithAi.calories_value,
                    sugar_value: dataRecipeWithAi.sugar_value,
                    cholesterol_value: dataRecipeWithAi.cholesterol_value,
                    natrium_value: dataRecipeWithAi.natrium_value,
                    other_nutrients: dataRecipeWithAi.other_nutrients,
                    ingredients: dataRecipeWithAi.ingredients,
                    steps: dataRecipeWithAi.steps
                }, 
                Recommendation: dataRecommendation.user_recommendation_value,
                isMealPlanExist
            }
        })
    } catch (error) {
        if(error.message == "recipe_name is required"){
            return res.status(400).json({
                success: false,
                code: 400,
                message: error.message
            });
        }
        if(error.message == "Recommendation Profile not found"){
            return res.status(400).json({
                success: false,
                code: 400,
                message: error.message
            });
        }
        if(error.message == "Recipe not found"){
            return res.status(404).json({
                success: false,
                code: 404,
                message: error.message
            });
        }
        console.error("Server Error di Controller Recipes, Function getRecipebyAi");
        return res.status(500).json({
            success: false,
            message: "Server error",
            serverMessage: error.message,
        });
    }
}

//CREATE
const addRecipe = async (req, res) => {
    try {
        const dataRecipe = req.validatedDataRecipes

        const addDataRecipe = await RecipesService.addRecipe(
            dataRecipe.recipe_photo, 
            dataRecipe.recipe_name, 
            dataRecipe.serving_size,
            dataRecipe.description, 
            dataRecipe.calories_value, 
            dataRecipe.sugar_value, 
            dataRecipe.cholesterol_value, 
            dataRecipe.natrium_value, 
            dataRecipe.other_nutrients, 
            dataRecipe.ingredients,
            dataRecipe.detail_ingredients,
            dataRecipe.steps, 
            dataRecipe.categories
        )

        
        res.status(201).json({
            success: true,
            message : "Create Recipe Success!",
            data: addDataRecipe
        })
    } catch (error) {
        if(error.message == "recipe name is already in use"){
            return res.status(400).json({
                success: false,
                code: 400,
                message: error.message
            });
        }
        console.error("Server Error di Controller Recipes, Function addRecipe");
        return res.status(500).json({
            success: false,
            message: "Server error",
            serverMessage: error.message,
        });
    }

}

//Update
const updateRecipeById = async (req, res) => {
    try {
        const recipe_id = parseInt(req.params.id)
        const dataRecipe = req.validatedDataRecipes

        const updateDataRecipe = await RecipesService.updateRecipeById(
            recipe_id,
            dataRecipe.recipe_photo, 
            dataRecipe.recipe_name,
            dataRecipe.serving_size, 
            dataRecipe.description, 
            dataRecipe.calories_value, 
            dataRecipe.sugar_value, 
            dataRecipe.cholesterol_value, 
            dataRecipe.natrium_value, 
            dataRecipe.other_nutrients, 
            dataRecipe.ingredients, 
            dataRecipe.detail_ingredients,
            dataRecipe.steps, 
            dataRecipe.categories
        )
        
        res.status(200).json({
            success: true,
            message : "Update Recipe Success!",
            data: updateDataRecipe
        })
    } catch (error) {
        console.error("Server Error di Controller Recipe, Function updateRecipeById");
        return res.status(500).json({
            success: false,
            message: "Server error",
            serverMessage: error.message,
        });
    }
}

//Delete
const deleteRecipeById = async (req, res) => {
    try {
        const recipe_id = parseInt(req.params.id) 
        
        const deleteRecipeById = await RecipesService.deleteRecipeById(recipe_id)

        return res.status(200).json({
            success: true,
            message : "Delete Recipe Success!",
            data: deleteRecipeById
        })

    } catch (error) {
        if(error.message == "Recipe not found"){
            return res.status(400).json({
                success: false,
                code: 400,
                message: error.message
            })
        }
        console.error("Server Error di Controller Recipe, Function deleteRecipeById");
        return res.status(500).json({
            success: false,
            message: "Server error",
            serverMessage: error.message,
        });
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