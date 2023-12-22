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

module.exports = {
    findProfile,
    findNutrition,
    
}