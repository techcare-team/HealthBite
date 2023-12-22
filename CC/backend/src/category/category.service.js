const CategoriesModel = require("./category.model")

// GET
const findCategories = async () => {
    const dataCategories = await CategoriesModel.findCategories()

    return dataCategories
}

const findCategoryById = async (category_id) => {
    if(!category_id){
        throw Error("Id is missing")
    }

    const dataCategoryById = await CategoriesModel.findCategoryById(category_id)
    
    if(!dataCategoryById){
        throw Error(`Category is not exist`)
    }

    return dataCategoryById
}


//CREATE
const createCategory = async (category_name) => {
    if(!category_name){
        throw Error("category_name field is missing")
    }

    const category = await CategoriesModel.findCategoryByName(category_name)

    if(category){
        throw Error("Category already exist")
    }

    const dataCategory = await CategoriesModel.createCategory(category_name)

    return dataCategory
}

//UPDATE
const updateCategory = async (category_id, category_name) => {
    if(!category_id){
        throw Error("Id is missing")
    }

    if(!category_name){
        throw Error("category_name field is missing")
    }
    
    const dataCategory = await CategoriesModel.findCategoryById(category_id)
    
    if(!dataCategory){
        throw Error("Category is not exist")
    }

    if(dataCategory.category_name == category_name){
        throw Error("Category name already exist")
    }

    const dataUpdateCategory = await CategoriesModel.updateCategory(category_id, category_name)
    return dataUpdateCategory
}


const deleteCategory = async (category_id) => {
    if(!category_id){
        throw Error("Id field is missing")
    }
    const dataCategory = await CategoriesModel.findCategoryById(category_id)
    
    if(!dataCategory){
        throw Error("Category is not exist")
    }

    const dataDeleteCategory = await CategoriesModel.deleteCategory(category_id)
    
    return dataDeleteCategory
}

module.exports = {
    findCategories,
    findCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
}