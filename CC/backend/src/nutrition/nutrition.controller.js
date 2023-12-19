const NutritionService = require("./nutrition.service")

const getNutrition = async (req, res) => {
    try{
        const account_id = req.userData.account_id

        const {
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
        } = await NutritionService.getNutrition(account_id)
        
        res.status(200).json({
            success: true,
            message : "Get Data Profile & Nutrition Success!",
            data: {
                statistic_profile: {
                    name: dataProfile.name,
                    profile_photo: dataProfile.profile_photo,
                    calories_value: calories_value,
                    calories_max_value: calories_max_value,
                    sugar_value: sugar_value,
                    sugar_max_value: sugar_max_value,
                    cholesterol_value: cholesterol_value,
                    cholesterol_max_value: cholesterol_max_value,
                    natrium_value: natrium_value,
                    natrium_max_value: natrium_max_value
                },
                daily_consume: {
                    remaining_calories, 
                    remaining_sugar, 
                    remaining_cholesterol, 
                    remaining_natrium
                },
                status_nutrients: {
                    statusCalories,
                    statusSugar,
                    statusCholesterol,
                    statusNatrium
                }
            }
        })
    } catch (error) {
        console.error("Server Error di Controller Nutrition, Function getNutrition");
        res.status(500).json({
            success: false,
            code: 500,
            message: error.message
        });
    }
}

module.exports = {
    getNutrition,
}