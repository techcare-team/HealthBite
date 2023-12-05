const AccountModel = require("./auth.model")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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


const createAccount = async (email, password) => {

    checkFieldAccount(email, password)

    //encrypt password
    const hashedPassword = await bcrypt.hash(password, 10)

    //check email
    const dataAccount =  await AccountModel.findAccountByEmail(email)

    if(dataAccount){
        throw Error("email is already exist!")
    }

    await AccountModel.createAccount(email, hashedPassword)

}

const getAccount = async (email, password) => {
    checkFieldAccount(email, password)

    //check email
    const dataAccount =  await AccountModel.findAccountByEmail(email)

    if(!dataAccount){
        throw Error("User not found")
    }

    const isPasswordValid = await bcrypt.compare(password, dataAccount.password)

    if(!isPasswordValid){
        throw Error("Wrong Password")
    }

    const payload = {
        account_id: dataAccount.account_id,
        email: dataAccount.email,
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
    createBlackListedToken
}
