const ProfileService = require("./profile.service")

const getProfile = async (req, res) => {
    try{
        const account_id = req.userData.account_id

        const {dataProfile, arrayDisease} = await ProfileService.getProfile(account_id)
        
        res.status(200).json({
            success: true,
            message : "Get Data Profile!",
            data: {
                name: dataProfile.name,
                profile_photo: dataProfile.profile_photo,
                penyakit_user: arrayDisease
            }
        })
    } catch (error) {
        console.error("Server Error di Controller profile, Function getProfile");
        res.status(500).json({
            success: false,
            code: 500,
            message: error.message
        });
    }
}

const getDetailProfile = async (req, res) => {
    try{
        const account_id = req.userData.account_id

        //Update Profile & Nutrition
        const {        
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
        } = await ProfileService.getDetailProfile(account_id)

        res.status(200).json({
            success: true,
            message : "Get Data Profile Success!",
            data: {
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
        })
    } catch (error) {
        console.error("Server Error di Controller profile, Function getDetailProfile");
        console.error(error.message);
        res.status(500).json({
            success: false,
            code: 500,
            message: error.message
        });
    }
}

//Update
const updateProfileAndNutrition = async (req, res) => {
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

        //Update Profile & Nutrition
        const {dataProfile, dataNutrition} = await ProfileService.updateProfileAndNutrition(
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

        res.status(200).json({
            success: true,
            message : "Update Data Profile & Nutrition Success!",
            data: {
                dataProfile, dataNutrition
            }
        })
    } catch (error) {
        console.error("Server Error di Controller profile, Function updateProfileAndNutrition");
        console.error(error.message);
        res.status(500).json({
            success: false,
            code: 500,
            message: error.message
        });
    }
}

const deleteProfile = async (req, res) => {
    try{
        const account_id = req.userData.account_id

        //Delete Profile & Nutrition
        const datadeleteProfile = await ProfileService.deleteProfile(account_id)

        res.status(200).json({
            success: true,
            message : "Delete Profile Success!",
            data: {
                datadeleteProfile
            }
        })
    } catch (error) {
        console.error("Server Error di Controller profile, Function deleteProfile");
        console.error(error.message);
        res.status(500).json({
            success: false,
            code: 500,
            message: error.message
        });
    }
}

module.exports = {
    getProfile,
    getDetailProfile,
    updateProfileAndNutrition,
    deleteProfile
}