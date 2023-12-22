const NutritionModel = require("./nutrition.model")

// GET
const getNutrition = async (account_id) => {
    const dataProfile = await NutritionModel.findProfile(account_id)

    if(!dataProfile){
        throw Error("Profile is not exist")
    }

    const dataNutrition = await NutritionModel.findNutrition(account_id)

    if(!dataNutrition){
        throw Error("Nutrition is not exist")
    }

    const {
        calories_value,
        calories_max_value,
        sugar_value,
        sugar_max_value,
        cholesterol_value,
        cholesterol_max_value,
        natrium_value,
        natrium_max_value
    } = dataNutrition

    const remaining_calories = calories_max_value - calories_value
    const remaining_sugar = sugar_max_value - sugar_value
    const remaining_cholesterol = cholesterol_max_value - cholesterol_value
    const remaining_natrium = natrium_max_value - natrium_value

    const {statusCalories, statusSugar, statusCholesterol, statusNatrium} = await calculateStatusNutrition(
        calories_value,
        calories_max_value,
        sugar_value,
        sugar_max_value,
        cholesterol_value,
        cholesterol_max_value,
        natrium_value,
        natrium_max_value
    )
    return {
        dataProfile, 
        calories_value,
        calories_max_value,
        sugar_value,
        sugar_max_value,
        cholesterol_value,
        cholesterol_max_value,
        natrium_value,
        natrium_max_value,
        statusCalories,
        statusSugar,
        statusCholesterol,
        statusNatrium, 
        remaining_calories, 
        remaining_sugar, 
        remaining_cholesterol, 
        remaining_natrium
    }
    
}

const calculateStatusNutrition = (
    calories_value,
    calories_max_value,
    sugar_value,
    sugar_max_value,
    cholesterol_value,
    cholesterol_max_value,
    natrium_value,
    natrium_max_value
    ) => {

    const limitCalories = Math.ceil((calories_max_value * 80) / 100)
    const limitSugar =  Math.ceil((sugar_max_value * 80) / 100)
    const limitCholesterol = Math.ceil((cholesterol_max_value * 80) / 100)
    const limitNatrium =  Math.ceil((natrium_max_value * 80) /100)

    let statusCalories = null
    let statusSugar = null
    let statusCholesterol = null
    let statusNatrium = null
    
    //Status Calories
    if(calories_value <= limitCalories){
        statusCalories = "Aman"
    } else if (calories_value > limitCalories && calories_value < calories_max_value ){
        statusCalories = "Kurang Direkomendasikan"
    } else {
        statusCalories = "Tidak Direkomendasikan"
    }

    //Status Sugar
    if(sugar_value <= limitSugar){
        statusSugar = "Aman"
    } else if (sugar_value > limitSugar && sugar_value < sugar_max_value ){
        statusSugar = "Kurang Direkomendasikan"
    } else {
        statusSugar = "Tidak Direkomendasikan"
    }

    //Status Cholesterol
    if(cholesterol_value <= limitCholesterol){
        statusCholesterol = "Aman"
    } else if (cholesterol_value > limitCholesterol && cholesterol_value < cholesterol_max_value ){
        statusCholesterol = "Kurang Direkomendasikan"
    } else {
        statusCholesterol = "Tidak Direkomendasikan"
    }

    //Status Natrium
    if(natrium_value <= limitNatrium){
        statusNatrium = "Aman"
    } else if (natrium_value > limitNatrium && natrium_value < natrium_max_value ){
        statusNatrium = "Kurang Direkomendasikan"
    } else {
        statusNatrium = "Tidak Direkomendasikan"
    }

    return {statusCalories, statusSugar, statusCholesterol, statusNatrium}
}

module.exports = {
    getNutrition,
}