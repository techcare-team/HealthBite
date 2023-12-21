package com.techcare.healthbite.apinetwork

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import com.techcare.healthbite.BuildConfig
import okhttp3.Interceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class ApiConfig {
    companion object{
        fun getApiService(): ApiService {
            val loggingInterceptor = if(BuildConfig.DEBUG) {
                HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY)
            } else {
                HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.NONE)
            }
            val authInterceptor = Interceptor { chain ->
                val req = chain.request()
                val requestHeaders = req.newBuilder()
                    .addHeader("Authorization", "token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiMTQ1NmY2OGEtYTNkYi00ZDVmLTg0MTMtOWQyNzI1NDlmZTIyIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDMwOTk2MTksImV4cCI6MTcwNTY5MTYxOX0.1IIzuLgewHJdX384Qqf8WrXh1W_y2RMJTCn-DvWuvsM")
                    .build()
                chain.proceed(requestHeaders)
            }
            val client = OkHttpClient.Builder()
                .addInterceptor(loggingInterceptor)
                .addInterceptor(authInterceptor)
                .build()
            val retrofit = Retrofit.Builder()
                .baseUrl(BuildConfig.BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .client(client)
                .build()
            return retrofit.create(ApiService::class.java)
        }
    }
}