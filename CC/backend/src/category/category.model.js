const prisma = require("../config/db.config")

//GET
const findCategories = () => {
    return prisma.category.findMany()
}

const findCategoryByName = (category_name) => {
    return prisma.category.findFirst({
        where: {
            category_name
        }
    })
}

const findCategoryById = (category_id) => {
    return prisma.category.findUnique({
        where: {
            category_id
        }
    })
}

//Create
const createCategory = (category_name) => {
    return prisma.category.create({
        data: {
            category_name,
        },
    })
}

//UPDATE
const updateCategory = (category_id, category_name) => {
    return prisma.category.update({
        where: {
            category_id
        },
        data: {
            category_name
        }
    })
}


//DELETE
const deleteCategory = (category_id) => {
    return prisma.category.delete({
            where:{
                category_id
            }
        })
}



module.exports = {
    findCategories,
    findCategoryByName,
    findCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
}