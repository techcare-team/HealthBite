const profileSettingsModel = require('./settings.model');

const getProfileSettings = async (profile_id) => {
    const result = await profileSettingsModel.getProfileSettings(profile_id);
    if(!result){
        throw new Error('Server error');
    }

    return result;
};


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
    const userProfile = await profileSettingsModel.getProfileSettings(account_id);

    if(!userProfile) {
        throw new Error('Profile is not exists');
    };

    await profileSettingsModel.updateProfileSettings(account_id, {
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


module.exports = {
    updateProfile,
    getProfileSettings
}