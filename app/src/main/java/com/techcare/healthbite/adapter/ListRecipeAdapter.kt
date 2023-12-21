package com.techcare.healthbite.adapter


import android.view.LayoutInflater

import android.view.ViewGroup
import android.widget.ImageView

import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.request.RequestOptions

import com.techcare.healthbite.databinding.ItemRowRecipeBinding
import com.techcare.healthbite.response.DataItem

class ListRecipeAdapter : androidx.recyclerview.widget.ListAdapter<DataItem, ListRecipeAdapter.RecipeViewHolder>(DIFF_CALLBACK){
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecipeViewHolder {
        val binding = ItemRowRecipeBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return RecipeViewHolder(binding)
    }

    override fun onBindViewHolder(holder: RecipeViewHolder, position: Int) {
        val recipe = getItem(position)
        holder.bind(recipe)
    }

    class RecipeViewHolder (private val binding: ItemRowRecipeBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(recipe: DataItem){


            binding.apply {

                Glide.with(binding.root.context)
                    .load(recipe.recipePhoto)
                    .apply(RequestOptions.circleCropTransform())
                    .into(imgFoodPhoto)
                tvFoodName.text = recipe.recipeName
                vmCal.text = recipe.caloriesValue.toString()
                vmGlu.text = recipe.sugarValue.toString()
                vmChol.text = recipe.cholesterolValue.toString()
                vmNat.text = recipe.natriumValue.toString()

            }
        }
    }



    companion object {
        const val EXTRA_USERNAME = "USERNAME"
        const val EXTRA_AVATAR = "AVATAR"
        const val EXTRA_ID = "ID"
        val DIFF_CALLBACK = object : DiffUtil.ItemCallback<DataItem>() {
            override fun areItemsTheSame(oldItem: DataItem, newItem: DataItem): Boolean {
                return oldItem == newItem
            }

            override fun areContentsTheSame(oldItem: DataItem, newItem: DataItem): Boolean {
                return oldItem == newItem
            }
        }
    }
}