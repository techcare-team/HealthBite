const ProfileModel = require("./profile.model")
const { AgeFromDateString } = require('age-calculator');

// GET
const getHomeProfile = async (account_id) => {
    const dataProfile = await ProfileModel.findProfile(account_id)

    if(!dataProfile){
        throw Error("Profile is not exist")
    }

    const dataNutrition = await ProfileModel.findNutrition(account_id)

    if(!dataNutrition){
        throw Error("Nutrition is not exist")
    }

    return {dataProfile, dataNutrition}
    
}

// PUT/UPDATE
//UPDATE Profile


// POST
const createProfile = async (            
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

    const dataProfile = await ProfileModel.createProfile(
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
    )

    return dataProfile
}

const createNutrition = async (
    account_id,
    gender,
    date_of_birth,
    height,
    weight,
    goal_id,
    diabetes,
    hypertension,
    heart_disease,
) => {
    const { maxCaloriesIntake, maxSugarsIntake, maxCholesterolIntake, maxNatriumIntake } = calculateMaxNutritionUser(
        gender,
        date_of_birth,
        height,
        weight,
        goal_id,
        diabetes,
        hypertension,
        heart_disease
    )

    const dataNutrition = await ProfileModel.createNutrition(
        account_id,
        maxCaloriesIntake, 
        maxSugarsIntake, 
        maxCholesterolIntake, 
        maxNatriumIntake
    )

    return dataNutrition
}

const calculateMaxNutritionUser = (
    gender,
    date_of_birth,
    height,
    weight,
    goal_id,
    diabetes,
    hypertension,
    heart_disease
) => {
    let maxCaloriesIntake = 0       //satuan kkal
    let maxSugarsIntake = 0         //satuan gram
    let maxCholesterolIntake = 0    //satuan mg
    let maxNatriumIntake = 0        //satuan mg

    //calculate max calories intake
    const age = new AgeFromDateString(date_of_birth).age;
    if(gender == "Laki-laki"){
        maxCaloriesIntake = parseInt(66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age));
    } else {
        maxCaloriesIntake = parseInt(655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age));
    }
/*  
    goal_id: 
    1 = Menaikkan Berat Badan
    2 = Menjaga Berat Badan
    3 = Menurunkan Berat Badan 
*/
    if (goal_id == 1) {
        maxCaloriesIntake += 500; // Tambah 500 calories
    } else if (goal_id == 3) {
        maxCaloriesIntake -= 500; // Kurang 500 calories
    }

    //calculate max sugar intake
    if(diabetes == true){
        maxSugarsIntake = 50
    } else {
        maxSugarsIntake = parseInt((maxCaloriesIntake * 0.1) / 4)
    }


    //calculate max cholesterol intake
    if(heart_disease == true){
        maxCholesterolIntake = 200
    } else {
        maxCholesterolIntake = 300
    }

    //calculate max natrium intake
    if(hypertension == true){
        maxNatriumIntake = 1500
    } else {
        maxNatriumIntake = 2000
    }

    return { maxCaloriesIntake, maxSugarsIntake, maxCholesterolIntake, maxNatriumIntake }
}


module.exports = {
    getHomeProfile,
    createProfile,
    createNutrition
}