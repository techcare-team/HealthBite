const prisma = require("../config/db.config")

//GET
const findAccountByEmail = (email) => {
    return prisma.account.findUnique({
        where: {
            email: email
        }
    })
}


//POST
const createAccount = (email, password) => {
    return prisma.account.create({
        data: {
            email: email,
            password: password
        }
    })
}

const createBlackListedToken = (token) => {
    return prisma.blacklistedToken.create({
        data: {
            token
        }
    })
}

module.exports = {
    findAccountByEmail,
    createAccount,
    createBlackListedToken
}