package com.techcare.healthbite.activity.detail

import android.app.Application
import android.util.Log
import android.widget.Toast
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.techcare.healthbite.apinetwork.ApiConfig
import com.techcare.healthbite.response.DetailRecipeResponse
import com.techcare.healthbite.response.DetailRecipeSmartResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class DetailRecipeViewModel (application: Application) : AndroidViewModel(application) {

    private var detailIsLoading = false

    private val _detailRecipe = MutableLiveData<DetailRecipeResponse>()
    val detailRecipe: LiveData<DetailRecipeResponse> = _detailRecipe

    private val _detailRecipeSmart = MutableLiveData<DetailRecipeSmartResponse>()
    val detailRecipeSmart: LiveData<DetailRecipeSmartResponse> = _detailRecipeSmart

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    fun getDetailRecipe(id: Int) {
        if (!detailIsLoading) {
            _isLoading.value = true
            val client = ApiConfig.getApiService().getDetailRecipe(id)
            client.enqueue(object : Callback<DetailRecipeResponse> {
                override fun onResponse(
                    call: Call<DetailRecipeResponse>,
                    response: Response<DetailRecipeResponse>
                ) {
                    _isLoading.value = false
                    if (response.isSuccessful) {
                        _detailRecipe.postValue(response.body())
                    } else {
                        Log.e(TAG, "onFailure: ${response.message()}")
                    }
                }

                override fun onFailure(call: Call<DetailRecipeResponse>, t: Throwable) {
                    _isLoading.value = false
                    Log.e(TAG, "onFailure: ${t.message.toString()}")
                }
            })
            detailIsLoading = true
        }
    }

    fun getDetailRecipeSmart(foodName: String) {
        if (!detailIsLoading) {
            _isLoading.value = true
            val client = ApiConfig.getApiService().getDetailRecipeSmart(foodName)
            client.enqueue(object : Callback<DetailRecipeSmartResponse> {
                override fun onResponse(
                    call: Call<DetailRecipeSmartResponse>,
                    response: Response<DetailRecipeSmartResponse>
                ) {
                    _isLoading.value = false
                    if (response.isSuccessful) {
                        _detailRecipeSmart.postValue(response.body())
                    } else {
                        Log.e(TAG, "onFailure: ${response.message()}")
                    }
                }

                override fun onFailure(call: Call<DetailRecipeSmartResponse>, t: Throwable) {
                    _isLoading.value = false
                    Log.e(TAG, "onFailure: ${t.message.toString()}")
                }
            })
            detailIsLoading = true
        }
    }



//    private fun addConsumtion(fav_user: FavoriteUser){
//        setIsFavorite(true)
//        myFavoriteRepository.insert(fav_user)
//    }


    companion object {
        private const val TAG = "DetailRecipeViewModel"
    }

}