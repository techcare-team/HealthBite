const GoalsModel = require("./goal.model")

// GET
const findGoals = async () => {
    const dataGoals = await GoalsModel.findGoals()

    return dataGoals
}

const findGoalById = async (goal_id) => {
    if(!goal_id){
        throw Error("Id is missing")
    }

    const dataGoalById = await GoalsModel.findGoalById(goal_id)
    
    if(!dataGoalById){
        throw Error(`Goal is not exist`)
    }

    return dataGoalById
}


//CREATE
const createGoal = async (goal_name) => {
    if(!goal_name){
        throw Error("goal_name field is missing")
    }
    const goal = await GoalsModel.findGoalByName(goal_name)

    if(goal){
        throw Error("Goal already exist")
    }

    const dataGoal = await GoalsModel.createGoal(goal_name)

    return dataGoal
}

//UPDATE
const updateGoal = async (goal_id, goal_name) => {
    if(!goal_id){
        throw Error("Id is missing")
    }

    if(!goal_name){
        throw Error("goal_name field is missing")
    }
    
    const dataGoal = await GoalsModel.findGoalById(goal_id)
    
    if(!dataGoal){
        throw Error("Goal is not exist")
    }

    if(dataGoal.goal_name == goal_name){
        throw Error("Goal name already exist")
    }

    const dataUpdateGoal = await GoalsModel.updateGoal(goal_id, goal_name)
    return dataUpdateGoal
}


const deleteGoal = async (goal_id) => {
    if(!goal_id){
        throw Error("Id field is missing")
    }
    const dataGoal = await GoalsModel.findGoalById(goal_id)
    
    if(!dataGoal){
        throw Error("Goal is not exist")
    }

    const dataDeleteGoal = await GoalsModel.deleteGoal(goal_id)
    
    return dataDeleteGoal
}

module.exports = {
    findGoals,
    findGoalById,
    createGoal,
    updateGoal,
    deleteGoal,
}