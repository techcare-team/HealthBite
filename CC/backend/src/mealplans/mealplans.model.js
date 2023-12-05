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
                    recipe_photo: true, 
                }
            }
        }
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

const addMealPlan = (account_id, recipe_id) => {
    return prisma.recipesOnMealPlans.create({
        data: {
            account_id,
            recipe_id,
          },
        })
}

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



module.exports = {
    getMealPlans,
    findMealPlansById,
    deleteMealPlan,
    addMealPlan
}