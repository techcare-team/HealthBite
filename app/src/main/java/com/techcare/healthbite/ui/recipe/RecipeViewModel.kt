package com.techcare.healthbite.ui.recipe

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.techcare.healthbite.apinetwork.ApiConfig
import com.techcare.healthbite.apinetwork.ApiService
import com.techcare.healthbite.data.PostConsumtionRequest
import com.techcare.healthbite.response.DataConsumtion
import com.techcare.healthbite.response.DataItemRecipe
import com.techcare.healthbite.response.DataItem
import com.techcare.healthbite.response.FindRecipeResponse
import com.techcare.healthbite.response.PostConsumtionResponse
import com.techcare.healthbite.response.RecipeResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RecipeViewModel: ViewModel() {

    private val _listRecipe = MutableLiveData<List<DataItem>>()
    val listRecipe: LiveData<List<DataItem>> = _listRecipe
    private val _listFindRecipe = MutableLiveData<List<DataItemRecipe>>()
    val listFindRecipe: LiveData<List<DataItemRecipe>> = _listFindRecipe
    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    companion object {
        private const val TAG = "com.techcare.healthbite.ui.recipe.recipeViewModel"
    }

    init {
        findRecipe()
    }

    fun findRecipe() {
        _isLoading.value = true
        val recipe = ApiConfig.getApiService().getRecipeList()
        recipe.enqueue(object : Callback<RecipeResponse> {
            override fun onResponse(
                call: Call<RecipeResponse>,
                response: Response<RecipeResponse>
            ) {
                _isLoading.value = false
                if (response.isSuccessful) {
                    _listRecipe.value = response.body()?.data
                } else {
                    Log.e(TAG, "onFailure: ${response.message()}")
                }
            }

            override fun onFailure(call: Call<RecipeResponse>, t: Throwable) {
                _isLoading.value = false
                Log.e(TAG, "onFailure: ${t.message.toString()}")
            }
        })
    }

    fun findRecipeBySearch(query: String) {
        _isLoading.value = true

        val recipe = ApiConfig.getApiService().getDetailRecipeSearch(query)

        recipe.enqueue(object : Callback<FindRecipeResponse> {
            override fun onResponse(
                call: Call<FindRecipeResponse>,
                response: Response<FindRecipeResponse>
            ) {
                _isLoading.value = false
                if (response.isSuccessful) {
                    _listFindRecipe.value = response.body()?.data
                } else {
                    Log.e(TAG, "onFailure: ${response.message()}")
                }
            }

            override fun onFailure(call: Call<FindRecipeResponse>, t: Throwable) {
                _isLoading.value = false
                Log.e(TAG, "onFailure: ${t.message.toString()}")
            }
        })
    }


}
