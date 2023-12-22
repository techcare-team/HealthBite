package com.techcare.healthbite.response

import com.google.gson.annotations.SerializedName

data class PostConsumtionResponse(

	@field:SerializedName("data")
	val data: DataConsumtion,

	@field:SerializedName("success")
	val success: Boolean,

	@field:SerializedName("message")
	val message: String
)

data class DataConsumtion(

	@field:SerializedName("account_id")
	val accountId: String,

	@field:SerializedName("recipe_id")
	val recipeId: Int
)
