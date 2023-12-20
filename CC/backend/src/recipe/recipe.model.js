const prisma = require("../config/db.config")

//Recipes Model
//GET
const findRecipes = () => {
    return prisma.recipe.findMany()
}

const findRecipeWithAI = (recipe_name) => {
    return prisma.recipe.findUnique({
        where: {
            recipe_name,
        },

    })
}

const findRecipesByProfileRecommendation = (account_id, filter) => {
    return prisma.recipe.findMany({
        where: filter,
        orderBy: {
            calories_value: 'desc'
        },
        select: {
            recipe_id: true,
            recipe_name: true,
            recipe_photo: true,
            calories_value: true,
            sugar_value: true,
            cholesterol_value: true,
            natrium_value: true,
            profile_recommendations: {
                where: {
                    account_id
                },
                select: {
                    calories_status: true,
                    sugar_status: true,
                    cholesterol_status: true,
                    natrium_status: true,
                    user_recommendation_value: true
                }
            }, categories: {
                select:{
                    category_name: true
                }    
            }
        },
    })
} 

//Get recipe by id
const findRecipeById = (recipe_id) => {
    return prisma.recipe.findUnique({
        where: {
            recipe_id
        }
    })
}

//Get recipe by name
const findRecipeByName = (recipe_name) => {
    return prisma.recipe.findUnique({
        where: {
            recipe_name
        },
        select: {
            recipe_name: true
        }
    })
}

//UPDATE
const updateRecipeById = (
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
) => {
    return prisma.recipe.update({
        where: {
            recipe_id
        },
        data: {
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
            categories: {
                create: data_categories.map(category_name => ({ category_name }))
            },
        }
    })
}

const updateRecipesRecommendation = (
    account_id, 
    recipe_id,
    calories_status,
    sugar_status,
    cholesterol_status,
    natrium_status,
    totalStatus,
) => {
    return prisma.recipesOnProfileRecommendations.updateMany({
        where: { 
          account_id,
          recipe_id
      },
        data: {
            calories_status,
            sugar_status,
            cholesterol_status,
            natrium_status,
            user_recommendation_value : totalStatus,
        },
      });
}

const updatePhotoRecipeById = (
    recipe_id,
    recipe_photo
) => {
    return prisma.recipe.update({
        where: { 
          recipe_id
      },
        data: {
            recipe_photo
        },
      });
}

//CREATE
const createRecipe = (
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
) => {
    return prisma.recipe.create({
        data: {
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
            categories: {
                create: data_categories.map(category_name => ({ category_name }))
            },
            profile_recommendations: {
                create: accountIdArray.map(account_id => ({ account_id }))
            }
        }
    })
}

//DELETE
const deleteRecipeById = (recipe_id) => {
    return prisma.recipe.delete({
        where: {
            recipe_id
        }
    })
}


//Account Model
//GET
const findAccount = () => {
    return prisma.account.findMany({
        select: {
            account_id: true
        }
    })
}

//Nutrition Model
//GET
const findNutrition = (account_id) => {
    return prisma.nutrition.findUnique({
        where: {
            account_id
        }
    })
}

//UPDATE
const updateNutritionOnProfile = (account_id, calories_value, sugar_value, cholesterol_value, natrium_value) => {
    return prisma.nutrition.update({
        where: {
            account_id
        },
        data: {
            calories_value,
            sugar_value,
            cholesterol_value,
            natrium_value
        }
    })
}

//Model MealPlans
//GET
const findMealPlanOnProfile = (account_id, recipe_id) => {
    return prisma.recipesOnMealPlans.findUnique({
        where: {
            account_id_recipe_id: {
                account_id,
                recipe_id
            }
        }
    })
}

//POST
const createMealPlan = (account_id, recipe_id) => {
    return prisma.recipesOnMealPlans.create({
        data: {
            account_id,
            recipe_id,
          },
    })
}

//Delete
const deleteMealPlan = (account_id, recipe_id)=>{
    return prisma.recipesOnMealPlans.delete({
        where: {
            account_id_recipe_id: {
                account_id,
                recipe_id
            }
        }
    })
}

//Model CategoriesonRecipes
//GET
const findCategoriesOnRecipe = (recipe_id) => {
    return prisma.categoriesOnRecipes.findMany({
        where: {
            recipe_id
        }
    })
}

//DELETE
const deleteCategoriesOnRecipe = (recipe_id) => {
    return prisma.categoriesOnRecipes.deleteMany({
        where: {
            recipe_id
        }
    })
}

//Model RecipeOnProfileRecommendation
//GET
const findProfileRecommendation = (account_id, recipe_id) => {
    return prisma.recipesOnProfileRecommendations.findFirst({
        where: {
            account_id,
            recipe_id
        }, select: {
            user_recommendation_value: true
        }
    })
}

const findProfileRecommendationOnRecipe = (recipe_id) => {
    return prisma.recipesOnProfileRecommendations.findMany({
        where: {
            recipe_id
        }
    })
}

//Delete
const deleteProfileRecommendationOnRecipe = (recipe_id) => {
    return prisma.recipesOnProfileRecommendations.deleteMany({
        where: {
            recipe_id
        }
    })
}


module.exports = {
    createRecipe,
    findRecipes,
    findRecipesByProfileRecommendation,
    findRecipeById,
    findRecipeByName,
    findRecipeWithAI,
    findAccount,
    findProfileRecommendation,
    findCategoriesOnRecipe,
    findProfileRecommendationOnRecipe,
    findMealPlanOnProfile,
    updateRecipeById,
    updateRecipesRecommendation,
    updateNutritionOnProfile,
    updatePhotoRecipeById,
    findNutrition,
    createMealPlan,
    deleteRecipeById,
    deleteCategoriesOnRecipe,
    deleteProfileRecommendationOnRecipe,
    deleteMealPlan
}

