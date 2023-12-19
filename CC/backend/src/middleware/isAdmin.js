const jwt = require("jsonwebtoken")
const prisma = require("../config/db.config")

const isAdmin = async (req, res, next) => {
    try {
        const data = req.userData
        if(data.role == "user"){
            throw Error("Unauthorized")
        }

    } catch (error) {
        return res.status(401).json({
            success: false,
            code: 401,
            message: error.message
        })
    }

    next()
}

module.exports = isAdmin