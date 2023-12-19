const SettingProfileServices = require('./settings.service');

const getProfileSettings = async (req, res) => {
    try{
        const { profile_id } = req.params;
        const userProfile = await SettingProfileServices.getProfileSettings(Number(profile_id));
        res.status(200).json({
            status: 'success',
            data: userProfile
        })
    }catch(err){
        res.status(500).json({
            message: 'Server error',
            error: err.message
        })
    }
};


const updateProfileSettings = async (req, res) => {
    try{  
        const {profile_id, date_of_birth} = req.body;
        const payload = req.body;
        const dateBirth = new Date(date_of_birth).toISOString();
        await SettingProfileServices.updateProfile(profile_id, {...payload, date_of_birth: dateBirth});

        res.status(200).json({
            message: 'User profile updated'
        });
    }catch(err) {
        res.status(500).json({
            message: 'Server error',
            error: err.message
        });
    }
};

module.exports = {
    getProfileSettings,
    updateProfileSettings
}