const prisma = require("../config/db.config")

//GET
const findProfile = (account_id) => {
    return prisma.profile.findUnique({
        where: {
            account_id
        },
        select: {
            profile_photo: true,
            name: true,
            diabetes: true,
            heart_disease: true,
            hypertension: true
        }
    })
}

const findDetailProfile = (account_id) => {
    return prisma.profile.findUnique({
        where: {
            account_id
        },
        select: {
            name: true,
            gender: true, 
            date_of_birth: true, 
            height: true,
            weight: true,
            goal_id: true,
            diabetes: true,
            blood_sugar_value: true,
            hypertension: true,
            blood_pressure_value: true, 
            heart_disease: true,
            total_cholesterol_value: true,
        }
    })
}

const findNutrition = (account_id) => {
    return prisma.nutrition.findUnique({
        where: {
            account_id
        }
    })
}

const findMealPlans = (account_id) => {
    return prisma.recipesOnMealPlans.findMany({
        where: {
            account_id
        }
    })
}

const findProfileRecommendations = (account_id) => {
    return prisma.recipesOnProfileRecommendations.findMany({
        where: {
            account_id
        }
    })
}

//Update
const updateProfile = (
    account_id, 
    name, 
    gender, 
    date_of_birth, 
    height,
    weight,
    goal_id,
    diabetes,
    blood_sugar_value,
    hypertension,
    blood_pressure_value, 
    heart_disease,
    total_cholesterol_value,
) => {
    return prisma.profile.update({
        where: {
            account_id
        },
        data: {
            name,
            gender,
            date_of_birth,
            height,
            weight,
            goal_id,
            diabetes,
            blood_sugar_value,
            hypertension,
            blood_pressure_value, 
            heart_disease,
            total_cholesterol_value,
        }
    })
}

const updateNutrition = (
    account_id,
    maxCaloriesIntake, 
    maxSugarsIntake, 
    maxCholesterolIntake, 
    maxNatriumIntake
) => {
    return prisma.nutrition.update({
        where: {
            account_id
        },
        data: {
            calories_max_value: maxCaloriesIntake,
            sugar_max_value: maxSugarsIntake,
            cholesterol_max_value: maxCholesterolIntake,
            natrium_max_value: maxNatriumIntake
        }
    })
}


//Delete
const deleteAccount = (account_id) => {
    return prisma.account.delete({
        where: {
            account_id
        },
        select: {
            account_id: true,
            email: true
        }
    })
}

const deleteNutrition = (account_id) => {
    return prisma.nutrition.delete({
        where: {
            account_id
        },
    })
}

const deleteProfile = (account_id) => {
    return prisma.profile.delete({
        where: {
            account_id
        },
    })
}

const deleteMealPlans = (account_id) => {
    return prisma.profile.deleteMany({
        where: {
            account_id
        },
    })
}

const deleteProfileRecommendations = (account_id) => {
    return prisma.recipesOnProfileRecommendations.deleteMany({
        where: {
            account_id
        },
    })
}


module.exports = {
    findProfile,
    findDetailProfile,
    findNutrition,
    findMealPlans,
    findProfileRecommendations,
    updateProfile,
    updateNutrition,
    deleteAccount,
    deleteNutrition,
    deleteProfile,
    deleteMealPlans,
    deleteProfileRecommendations,
}