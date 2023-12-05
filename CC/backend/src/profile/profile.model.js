const prisma = require("../config/db.config")

//GET
const findProfile = (account_id) => {
    return prisma.profile.findUnique({
        where: {
            account_id
        },
        select: {
            profile_photo: true,
            name: true
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

//POST
const createProfile = (
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
    return prisma.profile.create({
        data: {
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
        }
    })
}

const createNutrition = (
    account_id,
    maxCaloriesIntake, 
    maxSugarsIntake, 
    maxCholesterolIntake, 
    maxNatriumIntake
) => {
    return prisma.nutrition.create({
        data: {
            account_id,
            calories_max_value: maxCaloriesIntake,
            sugar_max_value: maxSugarsIntake,
            cholesterol_max_value: maxCholesterolIntake,
            natrium_max_value: maxNatriumIntake
        }
    })
}

//PUT


module.exports = {
    findProfile,
    findNutrition,
    createProfile,
    createNutrition
}