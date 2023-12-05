const AccountService = require("./auth.service")

const createAccount = async (req, res) => {
    try{
        const { email, password } = req.body;

        await AccountService.createAccount(email, password)
        
        res.status(200).json({
            message : "create Account success!",
        })
    } catch (error) {
        console.error("Server Error di Controller account, Function createAccount");
        res.status(500).json({
            message: "Server error",
            serverMessage: error.message,
        });
    }
}

const loginAccount = async (req, res) => {
    try {
        const { email, password } = req.body
        const {dataAccount, token} = await AccountService.getAccount(email, password)

        res.status(200).json({
            message : "Login success!",
            data: {
                email: dataAccount.email
            },
            token: token
        })
    } catch (error) {
        console.error("Server Error di Controller account, Function getAccount");
        if(error.message == "User not found"){
            res.status(404).json({
                message: error.message
            })
        } else if(error.message == "Wrong Password"){
            res.status(403).json({
                message: error.message
            })
        } else{
            res.status(500).json({
                message: "Server error",
                serverMessage: error.message,
            });
        }
    } 
}

const logoutAccount = async (req, res) => {
    try {        
        const token = req.header('Authorization').split(' ')[1];

        await AccountService.createBlackListedToken(token)

        res.status(200).json({
            message : "Logout success!",
        })

    } catch (error) {
        console.error("Server Error di Controller account, Function logoutAccount");
        res.status(500).json({
            message: "Server error",
            serverMessage: error.message,
        });
    } 
} 

module.exports = {
    createAccount,
    loginAccount,
    logoutAccount
}