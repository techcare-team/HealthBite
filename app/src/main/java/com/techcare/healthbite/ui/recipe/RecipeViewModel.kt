package com.techcare.healthbite.ui.recipe

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.techcare.healthbite.apinetwork.ApiConfig
import com.techcare.healthbite.response.DataItem
import com.techcare.healthbite.response.RecipeResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RecipeViewModel: ViewModel() {

    private val _listRecipe = MutableLiveData<List<DataItem>>()
    val listRecipe: LiveData<List<DataItem>> = _listRecipe
    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    companion object {
        private const val TAG = "com.latihan.ardab.aplikasigithubuser.data.model.MainViewModel"
    }

    init {
        findRecipe()
    }

    // Fungsi findRecipe tanpa parameter
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
}
