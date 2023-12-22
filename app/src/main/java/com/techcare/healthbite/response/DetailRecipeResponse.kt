package com.techcare.healthbite.response

import com.google.gson.annotations.SerializedName

data class DetailRecipeResponse(

	@field:SerializedName("data")
	val data: DataRecipeRecomendation,

	@field:SerializedName("success")
	val success: Boolean,

	@field:SerializedName("message")
	val message: String
)

data class DataRecipeRecomendation(

	@field:SerializedName("recipe")
	val recipe: Recipe,

	@field:SerializedName("isMealPlanExist")
	val isMealPlanExist: Boolean,

	@field:SerializedName("Recommendation")
	val recommendation: String
)

data class Recipe(

	@field:SerializedName("other_nutrients")
	val otherNutrients: List<String>,

	@field:SerializedName("recipe_id")
	val recipeId: Int,

	@field:SerializedName("cholesterol_value")
	val cholesterolValue: Int,

	@field:SerializedName("serving_size")
	val servingSize: String,

	@field:SerializedName("recipe_name")
	val recipeName: String,

	@field:SerializedName("description")
	val description: String,

	@field:SerializedName("ingredients")
	val ingredients: List<String>,

	@field:SerializedName("steps")
	val steps: List<String>,

	@field:SerializedName("recipe_photo")
	val recipePhoto: Any,

	@field:SerializedName("calories_value")
	val caloriesValue: Int,

	@field:SerializedName("sugar_value")
	val sugarValue: Int,

	@field:SerializedName("natrium_value")
	val natriumValue: Int
)
