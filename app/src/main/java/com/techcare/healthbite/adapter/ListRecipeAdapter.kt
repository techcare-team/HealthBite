package com.techcare.healthbite.adapter


import android.content.Intent
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.techcare.healthbite.activity.detail.DetailRecipeActivity
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

            val getId = recipe.recipeId
            binding.apply {

                Glide.with(binding.root.context)
                    .load(recipe.recipePhoto)
                    .into(imgFoodPhoto)
                tvFoodName.text = recipe.recipeName
                vmCal.text = recipe.caloriesValue.toString()
                vmGlu.text = recipe.sugarValue.toString()
                vmChol.text = recipe.cholesterolValue.toString()
                vmNat.text = recipe.natriumValue.toString()


                root.setOnClickListener {
                    val intent = Intent(binding.root.context, DetailRecipeActivity::class.java)
                    intent.putExtra(EXTRA_ID, getId)
                    binding.root.context.startActivity(intent)
                }

            }

        }
    }

    companion object {
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