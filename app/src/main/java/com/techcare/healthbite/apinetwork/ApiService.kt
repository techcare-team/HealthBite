package com.techcare.healthbite.apinetwork

import com.techcare.healthbite.response.DetailRecipeResponse
import com.techcare.healthbite.response.DetailRecipeSmartResponse
import com.techcare.healthbite.response.FindRecipeResponse
import com.techcare.healthbite.response.LoginResponse
import com.techcare.healthbite.response.PostConsumtionResponse
import com.techcare.healthbite.response.RecipeResponse
import retrofit2.Call
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.http.Query

interface ApiService {

    @FormUrlEncoded
    @POST("/auth/login")
    fun doSignin(
        @Field("email") email: String?,
        @Field("password") password: String?
    ): Call<LoginResponse>

    @GET("/recipes")
    fun getRecipeList(): Call<RecipeResponse>

    @GET("/recipes/{recipe_id}")
    fun getDetailRecipe(
        @Path("recipe_id") id: Int
    ): Call<DetailRecipeResponse>

    @GET("/recipes/")
    fun getDetailRecipeSmart(
        @Query("recipe_name") name: String,
        @Query("ai") ai: Boolean = true
    ): Call<DetailRecipeSmartResponse>

    @GET("/recipes/")
    fun getDetailRecipeSearch(
        @Query("recipe_name") name: String,
    ): Call<FindRecipeResponse>

    @POST("/mealplans")
    fun postMeals(): Call<PostConsumtionResponse>



}