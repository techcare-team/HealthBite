const express = require('express')
const dotenv = require('dotenv')
const app = express()

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT

const accessValidation = require("./middleware/accessValidation")
const isAdmin = require("./middleware/isAdmin")

const AuthRoutes = require("./auth/auth.routes")
const GoalsRoutes = require("./goal/goal.routes")
const CategoriesRoutes = require("./category/category.routes")
const ProfilesRoutes = require("./profile/profile.routes")
const NutritionsRoutes = require("./nutrition/nutrition.routes")
const MealPlansRoutes = require("./mealplans/mealplans.routes")
const RecipesRoutes = require("./recipe/recipe.routes")
const SettingsRoutes = require("./settings/settings.routes")

//Auth Routes
app.use("/auth", AuthRoutes)

//Goal Routes
app.use("/goal", accessValidation, isAdmin, GoalsRoutes)

//Categories
app.use("/category", accessValidation, isAdmin, CategoriesRoutes)

//Nutriton Routes
app.use("/nutrition", accessValidation, NutritionsRoutes)

//Profile Routes
app.use("/profile", accessValidation, ProfilesRoutes)

//MealPlans Routes
app.use("/mealplans", accessValidation, MealPlansRoutes)

//Recipes Routes
app.use("/recipes", accessValidation, RecipesRoutes)

//Settings Routes
app.use("/settings", accessValidation, SettingsRoutes )

//Handle Error
app.use((err, req, res, next) => {
    res.status(400).json({
        success: false,
        message: err.message
    })
})

app.get('/', (req, res) => {
    res.send('ok');
})

app.listen(PORT, ()=>console.log('listen port ' + PORT))