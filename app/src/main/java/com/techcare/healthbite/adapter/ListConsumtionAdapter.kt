package com.techcare.healthbite.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.techcare.healthbite.R
import com.techcare.healthbite.data.DailyConsumtion

class ListConsumtionAdapter (private val listConsumtion: ArrayList<DailyConsumtion>) : RecyclerView.Adapter<ListConsumtionAdapter.ListViewHolder>() {
    class ListViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val tvName: TextView = itemView.findViewById(R.id.tv_food_name)
        val tvCalories: TextView = itemView.findViewById(R.id.vm_cal)
        val tvSugar: TextView = itemView.findViewById(R.id.vm_glu)
        val tvCholesterol: TextView = itemView.findViewById(R.id.vm_chol)
        val tvNatrium: TextView = itemView.findViewById(R.id.vm_nat)

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ListViewHolder {
        val view: View = LayoutInflater.from(parent.context).inflate(R.layout.item_row_daily_consumtion, parent, false)
        return ListViewHolder(view)
    }

    override fun getItemCount(): Int = listConsumtion.size

    override fun onBindViewHolder(holder: ListViewHolder, position: Int) {
        val (name,calories, sugar, cholesterol, natrium) = listConsumtion[position]
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