const prisma = require("../config/db.config")

//GET
const findGoals = () => {
    return prisma.goal.findMany()
}

const findGoalByName = (goal_name) => {
    return prisma.goal.findUnique({
        where: {
            goal_name
        }
    })
}

const findGoalById = (goal_id) => {
    return prisma.goal.findUnique({
        where: {
            goal_id
        }
    })
}

//Create
const createGoal = (goal_name) => {
    return prisma.goal.create({
        data: {
            goal_name,
        },
    })
}

//UPDATE
const updateGoal = (goal_id, goal_name) => {
    return prisma.goal.update({
        where: {
            goal_id
        },
        data: {
            goal_name
        }
    })
}


//DELETE
const deleteGoal = (goal_id) => {
    return prisma.goal.delete({
            where:{
                goal_id
            }
        })
}



module.exports = {
    findGoals,
    findGoalById,
    findGoalByName,
    createGoal,
    updateGoal,
    deleteGoal,
}