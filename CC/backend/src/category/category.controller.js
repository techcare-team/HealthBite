const CategoriesService = require("./category.service")

//GET
const getCategories = async (req, res) => {
    try{
        const dataCategories = await CategoriesService.findCategories()
        
        return res.status(200).json({
            success: true,
            message : "GET Data Categories Success!",
            data: dataCategories
        })
    } catch (error) {
        console.error("Server Error di Controller category, Function getCategories");
        return res.status(500).json({
            success: false,
            message: "Server error",
            serverMessage: error.message,
        });
    }
}

const getCategoryById = async (req, res) => {
    try {
        const category_id = parseInt(req.params.id)
        const dataCategory = await CategoriesService.findCategoryById(category_id)

        return res.status(200).json({
            success: true,
            message : "GET Data Category by id Success!",
            data: dataCategory
        })
    } catch (error) {
        if(error.message == "Id is missing"){
            return res.status(400).json({
                success: false,
                code : 400,
                message: error.message
            })
        }
        if(error.message == "Category is not exist"){
            return res.status(404).json({
                success: false,
                code : 404,
                message: error.message,
            });
        }
        console.error("Server Error di Controller category, Function getCategoryById");
        return res.status(500).json({
            success: false,
            code: 500,
            message: "Server error",
            serverMessage: error.message,
        });
    }
}


//CREATE
const createCategory = async (req, res) => {
    try {
        const {category_name} = req.body

        const dataCategory = await CategoriesService.createCategory(category_name)

        return res.status(201).json({
            success: true,
            message : "CREATE Category Success!",
            data: dataCategory
        })

    } catch (error) {
        if(error.message == "Category already exist"){
            return res.status(404).json({
                success: false,
                code : 404,
                message: error.message,
            })
        }
        if(error.message == "category_name field is missing"){
            return res.status(400).json({
                success: false,
                code : 400,
                message: error.message
            })
        }
        console.error("Server Error di Controller category, Function createCategory");
        return res.status(500).json({
            success: false,
            code: 500,
            message: "Server error",
            serverMessage: error.message,
        });
    }    
}

//UPDATE
const updateCategory = async (req, res) => {
    try {
        const category_id = parseInt(req.params.id)
        const {category_name} = req.body
        
        const dataUpdateCategory = await CategoriesService.updateCategory(category_id, category_name)
        
        return res.status(200).json({
            success : true,
            message : "Update Category Success!",
            data: dataUpdateCategory
        })
    } catch (error) {
        if(error.message == "Id is missing"){
            return res.status(400).json({
                success: false,
                code : 400,
                message: error.message
            })
        }
        if(error.message == "category_name field is missing"){
            return res.status(400).json({
                success: false,
                code : 400,
                message: error.message
            })
        }
        if(error.message == "Category is not exist"){
            return res.status(404).json({
                success: false,
                code : 404,
                message: error.message
            })
        }
        if(error.message == "Category name already exist"){
            return res.status(404).json({
                success: false,
                code : 404,
                message: error.message
            })
        }
        console.error("Server Error di Controller Category, Function updateCategory");
        return res.status(500).json({
            success: false,
            code: 500,
            message: "Server error",
            serverMessage: error.message,
        })
    }
}

//DELETE
const deleteCategory = async (req, res) => {
    try {
        const category_id = parseInt(req.params.id)
    
        const dataDeleteCategory = await CategoriesService.deleteCategory(category_id)

        return res.status(200).json({
            success: true,
            message: "Delete Category Success",
            data: dataDeleteCategory
        })

    } catch (error) {
        if(error.message == "Id is missing"){
            return res.status(400).json({
                success: false,
                code : 400,
                message: error.message
            })
        }
        if(error.message == "Category is not exist"){
            return res.status(404).json({
                success: false,
                code: 404,
                message: error.message,
            })
        }
        console.error("Server Error di Controller Category, Function deleteCategory");
        return res.status(500).json({
            success: false,
            code: 500,
            message: "Server error",
            serverMessage: error.message,
        })
    }    
}

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
}