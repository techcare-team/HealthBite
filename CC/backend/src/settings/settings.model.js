const prisma = require('../config/db.config');

const getProfileSettings = (profile_id) => {
    return prisma.profile.findUnique({
        where: {
            profile_id
        }
    });
};

const updateProfileSettings = async (profile_id, {
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
    const result = await prisma.profile.update({
        where: {
            profile_id
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
            total_cholesterol_value
        },
    });
    return result;
}

module.exports = {
    getProfileSettings,
    updateProfileSettings
}