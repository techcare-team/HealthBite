const prisma = require("../config/db.config")

//GET
const findAccountByEmail = (email) => {
    return prisma.account.findUnique({
        where: {
            email: email
        }
    })
}


//POST
const createAccount = (account_id, email, password, name, role, recipeIdArray) => {
    return prisma.account.create({
        data: {
            account_id,
            email,
            password,
            role,
            profile: {
                create: {
                    name
                }
            },
            nutrition: {
                create: {
                    calories_value: 0,
                    sugar_value: 0,
                    cholesterol_value: 0,
                    natrium_value: 0
                }
            },
            recipe_recommendations: {
                create: recipeIdArray.map(recipe_id => ({ recipe_id }))
            }
        }
    })
}

const createAccountwithGoogle = (account_id, email, name, profile_photo, recipeIdArray) => {
    return prisma.account.create({
        data: {
            account_id,
            email,
            profile: {
                create: {
                    name,
                    profile_photo
                }
            },
            nutrition: {
                create: {
                    calories_value: 0,
                    sugar_value: 0,
                    cholesterol_value: 0,
                    natrium_value: 0
                }
            },
            recipe_recommendations: {
                create: recipeIdArray.map(recipe_id => ({ recipe_id }))
            }
        }
    })
}

const createBlackListedToken = (token) => {
    return prisma.blacklistedToken.create({
        data: {
            token
        }
    })
}

//Get All Recipes
const findRecipes = () => {
    return prisma.recipe.findMany({
        select: {
            recipe_id: true
        }
    })
}

module.exports = {
    findAccountByEmail,
    findRecipes,
    createAccount,
    createAccountwithGoogle,
    createBlackListedToken
}