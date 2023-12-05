const prisma = require("../config/db.config")

//Recipes Model
//GET
const findRecipes = () => {
    return prisma.recipe.findMany()
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
            profile_recommendations: {
                where: {
                    account_id
                }
            }, categories: {
                select:{
                    category_name: true
                }    
            }
        },
    })
} 

const findRecipeById = (recipe_id) => {
    return prisma.recipe.findUnique({
        where: {
            recipe_id
        }
    })
}

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

//UPDATE
const updateRecipesRecommendationTrue = (account_id, recipe_id) => {
    return prisma.recipesOnProfileRecommendations.updateMany({
        where: { 
          account_id,
          recipe_id
          
      },
        data: { user_recommendation_value: true },
      });
}

const updateRecipesRecommendationFalse = (account_id, recipe_id) => {
    return prisma.recipesOnProfileRecommendations.updateMany({
        where: { 
          account_id,
          recipe_id
          
      },
        data: { user_recommendation_value: false },
      });
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

//Model MealPlans
//POST
const createMealPlan = (account_id, recipe_id) => {
    return prisma.recipesOnMealPlans.create({
        data: {
            account_id,
            recipe_id,
          },
        })
}

module.exports = {
    findRecipes,
    findRecipesByProfileRecommendation,
    findRecipeById,
    findProfileRecommendation,
    updateRecipesRecommendationTrue,
    updateRecipesRecommendationFalse,
    findNutrition,
    createMealPlan
}