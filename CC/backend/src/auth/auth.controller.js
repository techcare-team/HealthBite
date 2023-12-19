const AccountService = require("./auth.service")
const {google} = require('googleapis')

const createAccount = async (req, res) => {
    try{
        const { email, password, role="user" } = req.body;
        const data = await AccountService.createAccount(email, password, role)
        
        res.status(201).json({
            success: true,
            message : "CREATE Account Success!",
            data: {
                email: data.email
            }
        })
    } catch (error) {
        console.error("Server Error di Controller account, Function createAccount");
        res.status(500).json({
            success: false,
            code: 500,
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
            success: true,
            message : "Login Success!",
            data: {
                email: dataAccount.email,
                token: token
            },
        })
    } catch (error) {
        console.error("Server Error di Controller account, Function loginAccount");
        if(error.message == "User Not Found"){
            res.status(404).json({
                success: false,
                code: 404,
                message: error.message
            })
        } else if(error.message == "Wrong Password"){
            res.status(403).json({
                success: false,
                code: 403,
                message: error.message
            })
        } else{
            res.status(500).json({
                success: false,
                message: "Server error",
                serverMessage: error.message,
            });
        }
    } 
}

//login google
const loginGoogle = async (req, res) => {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        'http://localhost:5000/auth/google/callback'
    )
    
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ]
    
    const authorizationUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        include_granted_scopes: true
    })
    res.redirect(authorizationUrl)
}

const loginGoogleCallback = async (req, res) => {
    try { 
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            'http://localhost:5000/auth/google/callback'
        )
        const {code} = req.query
        const {tokens} = await oauth2Client.getToken(code)
    
        oauth2Client.setCredentials(tokens)
    
        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        })
    
        const {data} = await oauth2.userinfo.get();
    
        const {dataAccount, token} = await AccountService.getAccountwithGoogle(data)

        res.status(200).json({
            success: true,
            message: "Login with Google Success",
            data: dataAccount,token: token
        })
    } catch (error) {
        console.error("Server Error di Controller auth, Function loginGoogleCallback");
        res.status(500).json({
            success: false,
            message: "Server error",
            serverMessage: error.message,
        });
    }
}

const logoutAccount = async (req, res) => {
    try {        
        const token = req.header('Authorization').split(' ')[1];

        await AccountService.createBlackListedToken(token)

        res.status(200).json({
            success: true,
            message : "Logout Success!",
        })

    } catch (error) {
        console.error("Server Error di Controller account, Function logoutAccount");
        res.status(500).json({
            success: false,
            message: "Server error",
            serverMessage: error.message,
        });
    } 
} 

module.exports = {
    createAccount,
    loginAccount,
    loginGoogle,
    loginGoogleCallback,
    logoutAccount
}