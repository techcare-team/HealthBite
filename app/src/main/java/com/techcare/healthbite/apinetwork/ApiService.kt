package com.techcare.healthbite.apinetwork

import com.techcare.healthbite.response.LoginResponse
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


}