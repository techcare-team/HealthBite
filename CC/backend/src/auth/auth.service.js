const AccountModel = require("./auth.model")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {v4 : uuidv4} = require('uuid')

const checkFieldAccount = (email, password) => {
    //check field email
    if(!email){
        throw Error("email is missing!")
    }

    //check field password
    if(!password){
        throw Error("password is missing!")
    }
}


const createAccount = async (email, password, role) => {

    checkFieldAccount(email, password)

    //encrypt password
    const hashedPassword = await bcrypt.hash(password, 10)

    //check email
    const dataAccount =  await AccountModel.findAccountByEmail(email)

    if(dataAccount){
        throw Error("email is already exist!")
    }

    if(email == "admin1@gmail.com"){
        role = "admin"
    }

    const account_id = uuidv4()
    const name = email.split('@')[0]

    const findRecipesId = await AccountModel.findRecipes()
    let recipeIdArray = []

    if(Array.isArray(findRecipesId) && findRecipesId.length > 0){
            recipeIdArray = findRecipesId.map(item => item.recipe_id);
    }

    const data = await AccountModel.createAccount(account_id, email, hashedPassword, name, role, recipeIdArray)

    return data
}

const getAccount = async (email, password) => {
    checkFieldAccount(email, password)

    //check email
    const dataAccount =  await AccountModel.findAccountByEmail(email)

    if(!dataAccount){
        throw Error("User not found")
    }

    const isPasswordValid = bcrypt.compare(password, dataAccount.password)

    if(!isPasswordValid){
        throw Error("Wrong Password")
    }

    const payload = {
        account_id: dataAccount.account_id,
        // email: dataAccount.email,
        role: dataAccount.role
    }

    const secret = process.env.JWT_SECRET
    
    const expiresIn = 60 * 60 * 24 * 30

    const token = jwt.sign(payload, secret, {expiresIn: expiresIn})

    return {dataAccount, token}
}

const getAccountwithGoogle = async (data) => {

    if(!data.email || !data.name){
        throw Error(data)
    }
    const account_id = uuidv4()

    let dataAccount = await AccountModel.findAccountByEmail(data.email)

    
    if(!dataAccount){
        const findRecipesId = await AccountModel.findRecipes()
        let recipeIdArray = []
    
        if(Array.isArray(findRecipesId) && findRecipesId.length > 0){
                recipeIdArray = findRecipesId.map(item => item.recipe_id);
        }
        dataAccount = await AccountModel.createAccountwithGoogle(account_id, data.email, data.name, data.picture, recipeIdArray)
    }

    const payload = {
        account_id: dataAccount.account_id,
        // email: dataAccount.email,
        role: dataAccount.role
    }

    const secret = process.env.JWT_SECRET
    
    const expiresIn = 60 * 60 * 24 * 30

    const token = jwt.sign(payload, secret, {expiresIn: expiresIn})
    
    return {dataAccount, token}
}

const createBlackListedToken = async (token) => {

    await AccountModel.createBlackListedToken(token)

}

module.exports = {
    createAccount,
    getAccount,
    getAccountwithGoogle,
    createBlackListedToken
}
