package com.techcare.healthbite.data

import com.google.gson.annotations.SerializedName

data class PostConsumtionRequest(
    @SerializedName("recipe_id") val recipeId: Int
)
