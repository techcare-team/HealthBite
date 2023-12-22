package com.techcare.healthbite.response

import com.google.gson.annotations.SerializedName

data class FindRecipeResponse(

	@field:SerializedName("data")
	val data: List<DataItemRecipe>,

	@field:SerializedName("success")
	val success: Boolean,

	@field:SerializedName("message")
	val message: String
)

data class ProfileRecommendationsItemRecipe(

	@field:SerializedName("calories_status")
	val caloriesStatus: String,

	@field:SerializedName("user_recommendation_value")
	val userRecommendationValue: String,

	@field:SerializedName("sugar_status")
	val sugarStatus: String,

	@field:SerializedName("cholesterol_status")
	val cholesterolStatus: String,

	@field:SerializedName("natrium_status")
	val natriumStatus: String
)

data class DataItemRecipe(

	@field:SerializedName("recipe_id")
	val recipeId: Int,

	@field:SerializedName("cholesterol_value")
	val cholesterolValue: Int,

	@field:SerializedName("recipe_name")
	val recipeName: String,

	@field:SerializedName("categories")
	val categories: List<CategoriesItemRecipe>,

	@field:SerializedName("profile_recommendations")
	val profileRecommendations: List<ProfileRecommendationsItemRecipe>,

	@field:SerializedName("recipe_photo")
	val recipePhoto: String,

	@field:SerializedName("calories_value")
	val caloriesValue: Int,

	@field:SerializedName("sugar_value")
	val sugarValue: Int,

	@field:SerializedName("natrium_value")
	val natriumValue: Int
)

data class CategoriesItemRecipe(

	@field:SerializedName("category_name")
	val categoryName: String
)
