const jwt = require("jsonwebtoken")
const prisma = require("../config/db.config")


const accessValidation = async (req, res, next) => {
    const {authorization} = req.headers
    
    if(!authorization){
        return res.status(401).json({
            success: false,
            code: 401,
            message: "Token is required"
        })
    }

    const token = authorization.split(' ')[1]
    
    const isInBlacklist = await prisma.blacklistedToken.findUnique({
        where: { token },
    });

    if (isInBlacklist) {
        return res.status(401).json({
            success: false,
            code: 401,
            message: "Please Log In"
        });
    }

    const secret = process.env.JWT_SECRET

    try {
        const jwtDecode = jwt.verify(token, secret)

        const user = await prisma.account.findUnique({
            where: {
                account_id: jwtDecode.account_id
            }
        })

        if(!user){
            throw Error("user not found")
        }

        req.userData = jwtDecode
    } catch (error) {
        return res.status(401).json({
            success: false,
            code: 401,
            message: error.message
        })
    }

    next()
}

module.exports = accessValidation