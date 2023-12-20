package com.techcare.healthbite.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.techcare.healthbite.R
import com.techcare.healthbite.data.Recipe

class ListRecipeAdapter (private val listRecipe: ArrayList<Recipe>) : RecyclerView.Adapter<ListRecipeAdapter.ListViewHolder>() {
    class ListViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val imgFood: ImageView = itemView.findViewById(R.id.img_food_photo)
        val tvName: TextView = itemView.findViewById(R.id.tv_food_name)
        val tvCalories: TextView = itemView.findViewById(R.id.vm_cal)
        val tvSugar: TextView = itemView.findViewById(R.id.vm_glu)
        val tvCholesterol: TextView = itemView.findViewById(R.id.vm_chol)
        val tvNatrium: TextView = itemView.findViewById(R.id.vm_nat)

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ListViewHolder {
        val view: View = LayoutInflater.from(parent.context).inflate(R.layout.item_row_recipe, parent, false)
        return ListViewHolder(view)
    }

    override fun getItemCount(): Int = listRecipe.size

    override fun onBindViewHolder(holder: ListViewHolder, position: Int) {
        val (photo, name,calories, sugar, cholesterol, natrium) = listRecipe[position]
        holder.imgFood.setImageResource(photo)
        holder.tvName.text = name
        holder.tvCalories.text = calories.toString()
        holder.tvSugar.text = sugar.toString()
        holder.tvCholesterol.text = cholesterol.toString()
        holder.tvNatrium.text = natrium.toString()

        val mContext = holder.itemView.context

        holder.itemView.setOnClickListener {

        }
    }

}