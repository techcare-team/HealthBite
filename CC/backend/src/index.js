const express = require('express')
const dotenv = require('dotenv')
const app = express()

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT

const accessValidation = require("./middleware/accessValidation")

const AccountRoutes = require("./auth/auth.routes")
const ProfileRoutes = require("./profile/profile.routes")
const MealPlansRoutes = require("./mealplans/mealplans.routes")
const RecipesRoutes = require("./recipe/recipe.routes")
const SettingsRoutes = require("./settings/settings.routes")

app.use("/auth", AccountRoutes)

app.use("/profile", accessValidation, ProfileRoutes)

app.use("/mealplans", accessValidation, MealPlansRoutes)

app.use("/recipes", accessValidation, RecipesRoutes)

app.use("/settings", accessValidation,SettingsRoutes )

app.listen(PORT, ()=>console.log('listen port ' + PORT))