const ProfileModel = require("./profile.model")
const { AgeFromDateString } = require('age-calculator');

// GET
const getProfile = async (account_id) => {
    const dataProfile = await ProfileModel.findProfile(account_id)

    if(!dataProfile){
        throw Error("Profile is not exist")
    }

    let arrayDisease = []

    if(dataProfile.diabetes == true){
        arrayDisease.push("Penderita Diabetes")
    }

    if(dataProfile.heart_disease == true){
        arrayDisease.push("Penderita Penyakit Jantung")
    }
    
    if(dataProfile.hypertension == true){
        arrayDisease.push("Penderita Darah Tinggi")
    }
    

    return {dataProfile, arrayDisease}
    
}

const getDetailProfile = async (account_id) => {
    const dataDetailProfile = await ProfileModel.findDetailProfile(account_id)

    
    if(!dataDetailProfile){
        throw Error("Profile is not exist")
    }

    let {        
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
        total_cholesterol_value
    } = dataDetailProfile

    goal_name = null

    if(goal_id == 1){
        goal_name = "Menaikkan Berat Badan"
    } else if(goal_id == 2){
        goal_name = "Menjaga Berat Badan"
    } else {
        goal_name = "Menurunkan Berat Badan"
    }

    if(blood_sugar_value == null){
        blood_sugar_value = 0
    }

    if(blood_pressure_value == null){
        blood_pressure_value = 0
    }

    if(total_cholesterol_value == null){
        total_cholesterol_value = 0
    }

    date_of_birth = date_of_birth.toISOString().split('T')[0]

    return {
        name, 
        gender, 
        date_of_birth, 
        height,
        weight,
        goal_name,
        diabetes,
        blood_sugar_value,
        hypertension,
        blood_pressure_value, 
        heart_disease,
        total_cholesterol_value
    }
    
}

// PUT/UPDATE
const updateProfileAndNutrition = async (
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
    const dataProfile = await ProfileModel.updateProfile(
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
    
    //calculate Max Nutritrion User
    const { maxCaloriesIntake, maxSugarsIntake, maxCholesterolIntake, maxNatriumIntake } = await calculateMaxNutritionUser(
        gender,
        date_of_birth,
        height,
        weight,
        goal_id,
        diabetes,
        hypertension,
        heart_disease
    )

    const dataNutrition = await ProfileModel.updateNutrition(
        account_id,
        maxCaloriesIntake, 
        maxSugarsIntake, 
        maxCholesterolIntake, 
        maxNatriumIntake
    )
    
    return {dataProfile, dataNutrition}
}

//UPDATE Profile
const updateProfile = async (account_id,{
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
    total_cholesterol_value
}) => {
    const userProfile = await ProfileModel.findProfile(account_id);

    if(!userProfile) {
        throw new Error('Profile is not exists');
    };

    await ProfileModel.updateProfile(account_id, {
        name,
        gender,
        blood_pressure_value,
        blood_sugar_value,
        date_of_birth,
        diabetes,
        goal_id,
        heart_disease,
        height,
        hypertension,
        total_cholesterol_value,
        weight
    });
}

//Delete
const deleteProfile = async (account_id) =>{
    const dataNutrition = await ProfileModel.findNutrition(account_id)

    if(dataNutrition){
        await ProfileModel.deleteNutrition(account_id)
    }

    const dataProfile = await ProfileModel.findProfile(account_id)

    if(dataProfile){
        await ProfileModel.deleteProfile(account_id)
    }

    const dataMealPlans = await ProfileModel.findMealPlans(account_id)

    if(dataMealPlans){
        await ProfileModel.deleteMealPlans(account_id)
    }

    const dataProfileRecommendation = await ProfileModel.findProfileRecommendations(account_id)

    if(dataProfileRecommendation){
        await ProfileModel.deleteProfileRecommendations(account_id)
    }

    const deleteProfile = await ProfileModel.deleteAccount(account_id)

    return deleteProfile
}



//Function for Calculate Max Nutrition User
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
    getProfile,
    getDetailProfile,
    updateProfile,
    updateProfileAndNutrition,
    deleteProfile
}