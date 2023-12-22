const prisma = require("../config/db.config")

const recipeValidationInput = async (req, res, next) => {
    try {    
        let {
          recipe_photo,
          recipe_name,
          serving_size,
          description,
          calories_value,
          sugar_value,
          cholesterol_value,
          natrium_value,
          other_nutrients,
          ingredients,
          detail_ingredients,
          steps,
          categories
        } = req.body;
        
        // Perform validation input checks for profile 
        const errors = [];

        if(!recipe_photo){
            recipe_photo = null
        } 

        if(!recipe_name){
          errors.push('recipe_name required')
        }else if (typeof recipe_name !== 'string' || recipe_name.trim() === '') {
          errors.push('Name must be a non-empty string.');
        }

        if(serving_size && typeof serving_size !== 'string' || serving_size.trim() === ''){
            errors.push('Serving Size must be a non-empty string.')
        }
        
        if (!description) {
            errors.push('description is required.');
          } else if (typeof description !== 'string' || description.trim() === '') {
            errors.push('Description must be a non-empty string.');
        }
        
        if(!calories_value){
          errors.push('calories_value is required.')
        }else if (calories_value && (isNaN(calories_value) || calories_value <0)) {
            errors.push('Invalid calories_value. Must be a positive number.');
        }

        if(!sugar_value){
          errors.push('sugar_value is required.')
        }else if (sugar_value && (isNaN(sugar_value) || sugar_value <0)) {
            errors.push('Invalid sugar_value. Must be a positive number.');
        }

        if(!cholesterol_value){
          errors.push('cholesterol_value is required.')
        }else if (cholesterol_value && (isNaN(cholesterol_value) || cholesterol_value <0)) {
            errors.push('Invalid cholesterol_value. Must be a positive number.');
        }

        if(!natrium_value){
          errors.push('natrium_value is required.')
        }else if (natrium_value && (isNaN(natrium_value) || natrium_value <0)) {
            errors.push('Invalid natrium_value. Must be a positive number.');
        }

        if(!other_nutrients ){
            errors.push('natrium_value is required.')
        } else if(other_nutrients){
            other_nutrients = JSON.parse(other_nutrients)
            if(!Array.isArray(other_nutrients)){
                errors.push('Invalid other_nutrients. Must be a Array')
            }
        }

        if(!ingredients ){
            errors.push('ingredients is required.')
        } else if(ingredients){
            ingredients = JSON.parse(ingredients)
            if(!Array.isArray(ingredients)){
                errors.push('Invalid ingredients. Must be a Array')
            }
        }

        if(!detail_ingredients ){
            errors.push('detail_ingredients is required.')
        } else if(detail_ingredients){
            detail_ingredients = JSON.parse(detail_ingredients)
            if(!Array.isArray(detail_ingredients)){
                errors.push('Invalid detail_ingredients. Must be a Array')
            }
        }

        if(!steps ){
            errors.push('steps is required.')
        } else if(steps){
            steps = JSON.parse(steps)
            if(!Array.isArray(steps)){
                errors.push('Invalid steps. Must be a Array')
            }
        }

        if(!categories){
            errors.push('categories is required.')
        } else if(categories){
            categories = JSON.parse(categories)
            if(!Array.isArray(categories)){
                errors.push('Invalid categories. Must be a Array')
            }
            if(categories.length == 0) {
                errors.push('At least one category must be selected')
            }
        }

        // Check if there are any validation errors
        if (errors.length > 0) {
            return res.status(400).json({ 
                success: false,
                code: 400, 
                message: errors 
            });
        }

        const categoriesExist = await prisma.category.findMany({
            where: {
              category_name: {
                in: categories,
              },
            },
          });

        const missingCategories = categories.filter(
            category => !categoriesExist.some(existingCategory => existingCategory.category_name === category)
        );
        
        if (missingCategories.length > 0) {
            return res.status(400).json({
                success: false,
                code: 400,
                message: `Invalid Category: ${missingCategories.join(', ')}`
            })
        }

        calories_value = parseInt(calories_value)
        sugar_value = parseInt(sugar_value)
        cholesterol_value = parseInt(cholesterol_value)
        natrium_value = parseInt(natrium_value)

        // If validation passes, attach the validated data to the request object
        req.validatedDataRecipes = {
            recipe_photo,
            recipe_name,
            serving_size,
            description,
            calories_value,
            sugar_value,
            cholesterol_value,
            natrium_value,
            other_nutrients,
            ingredients,
            detail_ingredients,
            steps,
            categories
        };
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid input data recipe",
            serverMessage: error.message
        })
    }
  
    next(); // Continue to the next middleware or route handler
  };

  module.exports = recipeValidationInput