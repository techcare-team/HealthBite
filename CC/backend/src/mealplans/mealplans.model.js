const prisma = require("../config/db.config")

//GET
const getMealPlans = (account_id) => {
    return prisma.recipesOnMealPlans.findMany({
        where: {
            account_id
        },
        select: {
            recipe_id: true,
            recipe: {
                select: {
                    recipe_name: true,
                    calories_value: true,
                    sugar_value: true,
                    cholesterol_value: true,
                    natrium_value: true
                }
            }
        }
    })
}

//Create
const createMealPlan = (account_id, recipe_id) => {
    return prisma.recipesOnMealPlans.create({
        data: {
            account_id,
            recipe_id,
          },
    })
}

const findMealPlansById = (account_id, recipe_id) => {
    return prisma.recipesOnMealPlans.findUnique({
        where: {
            account_id_recipe_id: {
                account_id,
                recipe_id
            }
        }
    })
}

//Update
const updateMealPlan= (account_id, old_recipe_id, recipe_id) => {
    return prisma.recipesOnMealPlans.update({
            where:{
                account_id_recipe_id: {
                    account_id,
                    recipe_id: old_recipe_id
                }
            },
            data: {
                account_id,
                recipe_id: recipe_id
            }
        })
}

//Delete
const deleteMealPlan = (account_id, recipe_id) => {
    return prisma.recipesOnMealPlans.delete({
            where:{
                account_id_recipe_id: {
                    account_id,
                    recipe_id
                }
            }
        })
}

//Get Nutrition
const findNutrition = (account_id) => {
    return prisma.nutrition.findUnique({
        where: {
            account_id
        }
    })
}

//Update Nutrition
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

//Get Recipe by id
const findRecipeById = (recipe_id) => {
    return prisma.recipe.findUnique({
        where: {
            recipe_id
        }
    })
}

module.exports = {
    getMealPlans,
    createMealPlan,
    findMealPlansById,
    findNutrition,
    findRecipeById,
    updateMealPlan,
    updateNutritionOnProfile,
    deleteMealPlan,
}