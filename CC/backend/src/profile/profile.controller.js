const ProfileService = require("./profile.service")

const getHomeProfile = async (req, res) => {
    try{
        const account_id = req.userData.account_id

        const {dataProfile, dataNutrition} = await ProfileService.getHomeProfile(account_id)
        
        res.status(200).json({
            message : "get data Profile & Nutrition success!",
            data: {
                name: dataProfile.name,
                profile_photo: dataProfile.profile_photo,
                calories_value: dataNutrition.calories_value,
                calories_max_value: dataNutrition.calories_max_value,
                sugar_value: dataNutrition.sugar_value,
                sugar_max_value: dataNutrition.sugar_max_value,
                cholesterol_value: dataNutrition.cholesterol_value,
                cholesterol_max_value: dataNutrition.cholesterol_max_value,
                natrium_value: dataNutrition.natrium_value,
                natrium_max_value: dataNutrition.natrium_max_value
            }
        })
    } catch (error) {
        console.error("Server Error di Controller profile, Function getHomeProfile");
        res.status(500).json({
            message: "Server error",
            serverMessage: error.message,
        });
    }
}

const createProfileAndNutrition = async (req, res) => {
    try{
        const account_id = req.userData.account_id
        const {
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
        } = req.validatedData

        //create profile
        const dataProfile = await ProfileService.createProfile(
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

        //create nutrition
        const dataNutrition = await ProfileService.createNutrition(
            account_id,
            gender,
            date_of_birth,
            height,
            weight,
            goal_id,
            diabetes,
            hypertension,
            heart_disease,
        )

        console.log(`di controller profile${account_id}`)

        res.status(200).json({
            message : "get data Profile & Nutrition success!",
            data: {
                dataProfile, dataNutrition
            }
        })
    } catch (error) {
        console.error("Server Error di Controller profile, Function createProfileAndNutrition");
        console.error(error.message);
        res.status(500).json({
            message: "Server error",
            serverMessage: error.message,
        });
    }
}

//UPDATE Profile
const updateProfile = async (req, res) => {
    try{
        const { profile_id, date_of_birth } = req.body;
        const payload = req.body;
        const newDate = new Date(date_of_birth).toISOString();
        await ProfileService.updateProfile(profile_id, {...payload, date_of_birth: newDate});
        res.status(200).json({
            message: 'profile updated'
        })
    } catch(err){
        res.status(500).json({
            message: 'Server error',
            serverMessage: err.message
        })
    }
};

module.exports = {
    getHomeProfile,
    createProfileAndNutrition,
    updateProfile
}