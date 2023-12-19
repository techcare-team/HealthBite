const { AgeFromDate } = require("age-calculator");
const prisma = require("../config/db.config")

const profileValidationInput = async (req, res, next) => {
    try {    
        const {account_id, email} = req.userData
        
        const isProfileExist = await prisma.profile.findUnique({
            where: {
                account_id
            }
        })
    
        if(!isProfileExist){
            throw Error("Profile is not exist")
        }
        
        let {
          name,
          gender,
          date_of_birth,
          height,
          weight,
          goal_id,
          diabetes,
          blood_sugar_value,
          hypertension,
          blood_pressure_value,
          heart_disease,
          total_cholesterol_value,
        } = req.body;
        
        // Perform validation input checks for profile 
        const errors = [];

        if(!name){
          name = isProfileExist.name
        }else if (typeof name !== 'string' || name.trim() === '') {
          errors.push('Name must be a non-empty string.');
        }
        
        if (!gender) {
            errors.push('Gender is required.');
          } else if (gender !== "Laki-laki" && gender !== "Perempuan") {
            errors.push('Invalid gender. Must be one of: Laki-laki or Perempuan.');
        }
        
        if(!date_of_birth){
          errors.push('Date of Birth is required.')
        }else if (date_of_birth && !isValidDate(date_of_birth)) {
            errors.push('Invalid date of birth format. Use YYYY-MM-DD.');
        }
        
        if(!height){
          errors.push('Height is required.')
        }else if (height && (isNaN(height) || height <= 0 )) {
            errors.push('Invalid height. Must be a positive number.');
        }
        
        if(!weight){
          errors.push('Weight is required.')
        }else if (weight && (isNaN(weight) || weight <= 0)) {
            errors.push('Invalid weight. Must be a positive number.');
        }
        
        if(!goal_id){
            errors.push('Goal is required.')
        } else if(isNaN(goal_id)){
            errors.push('Goal must be a positive number.')
        } 

        if(goal_id){
          goal_id = parseInt(goal_id)
            const isGoalIdExist = await prisma.goal.findUnique({
                where: {
                    goal_id
                }
            })
            if(!isGoalIdExist){
                errors.push('Goal is not exist.')
            }
        }

        if(diabetes === undefined){
          errors.push('diabetes is required.')
        }else if (diabetes !== undefined && typeof diabetes !== 'boolean') {
            errors.push('Invalid diabetes value. Must be a boolean.');
          }
        
          if (blood_sugar_value !== undefined && (isNaN(blood_sugar_value) || blood_sugar_value < 0)) {
            errors.push('Invalid blood sugar value. Must be a non-negative number.');
          }
        
          if(hypertension === undefined){
            errors.push('hypertension is required.')
          }else if (hypertension !== undefined && typeof hypertension !== 'boolean') {
            errors.push('Invalid hypertension value. Must be a boolean.');
          }
        
          if (blood_pressure_value !== undefined && (isNaN(blood_pressure_value) || blood_pressure_value < 0)) {
            errors.push('Invalid blood pressure value. Must be a non-negative number.');
          }
        
          if(heart_disease === undefined){
            errors.push('heart_disease is required.')
          }else if (heart_disease !== undefined && typeof heart_disease !== 'boolean') {
            errors.push('Invalid heart disease value. Must be a boolean.');
          }
        
          if (total_cholesterol_value !== undefined && (isNaN(total_cholesterol_value) || total_cholesterol_value < 0)) {
            errors.push('Invalid total cholesterol value. Must be a non-negative number.');
          }
          
          // Check if there are any validation errors
          if (errors.length > 0) {
            return res.status(400).json({ 
              success: false,
              code: 400,
              message: errors 
            });
          }
          
          height = parseInt(height)
          weight = parseInt(weight)
          date_of_birth = new Date(date_of_birth).toISOString()
          
          if(blood_sugar_value){
            blood_sugar_value = parseInt(blood_sugar_value)
          }

          if(blood_pressure_value){
            blood_pressure_value = parseInt(blood_pressure_value)
          }

          if(total_cholesterol_value){
            total_cholesterol_value = parseInt(total_cholesterol_value)
          }
          
      
        // If validation passes, attach the validated data to the request object
        req.validatedData = {
          name,
          gender,
          date_of_birth,
          height,
          weight,
          goal_id,
          diabetes,
          blood_sugar_value,
          hypertension,
          blood_pressure_value,
          heart_disease,
          total_cholesterol_value,
        };
    } catch (error) {
        return res.status(401).json({
          success: false,
            message: "Invalid input data profile",
            serverMessage: error.message
        })
    }
  
    next(); // Continue to the next middleware or route handler
  };

  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(regex) !== null;
  };

  module.exports = profileValidationInput