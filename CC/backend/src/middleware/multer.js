const multer = require('multer')
const path = require('path')

const storageRecipes = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "null")
    },
    filename: (req, file, cb) => {
        const timestamp = new Date().getTime();
        const originalName = file.originalname;
        cb(null, `${timestamp}-recipes-${originalName}`)
    }
})


const uploadRecipe = multer({
    storage: storageRecipes,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return cb(new Error('Only file with .png, .jpg, .jpeg extension are allowed'))
        }
        cb(null, true)
    },
    limits: {
        fileSize: 3 * 1000 * 1000
    }
})


module.exports = uploadRecipe