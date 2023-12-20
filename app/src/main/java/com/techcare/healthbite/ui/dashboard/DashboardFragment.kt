package com.techcare.healthbite.ui.dashboard

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.techcare.healthbite.R
import com.techcare.healthbite.adapter.ListConsumtionAdapter
import com.techcare.healthbite.data.DailyConsumtion
import com.techcare.healthbite.databinding.FragmentDashboardBinding

class DashboardFragment : Fragment() {
    private lateinit var rvConsumtion: RecyclerView
    private var _binding: FragmentDashboardBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        _binding = FragmentDashboardBinding.inflate(inflater, container, false)
        val root: View = binding.root

        binding.rvDailyConsumtion.setHasFixedSize(true)

        rvConsumtion = binding.rvDailyConsumtion

        showRecyclerList()

        return root
    }

    private fun getListConsumtion(): ArrayList<DailyConsumtion> {
        val dataName = resources.getStringArray(R.array.data_name)
        val dataCalories = resources.getIntArray(R.array.data_calories)
        val dataSugar = resources.getIntArray(R.array.data_sugar)
        val dataCholesterol = resources.getIntArray(R.array.data_cholesterol)
        val dataNatrium = resources.getIntArray(R.array.data_natrium)

        val listConsumption = ArrayList<DailyConsumtion>()
        for (i in dataName.indices) {
            val consumtion = DailyConsumtion(dataName[i],  dataCalories[i], dataSugar[i], dataCholesterol[i], dataNatrium[i])
            listConsumption.add(consumtion)
        }
        return listConsumption
    }

    private fun showRecyclerList() {
        rvConsumtion.layoutManager = LinearLayoutManager(requireContext())
        val listConsumtionAdapter = ListConsumtionAdapter(getListConsumtion())
        rvConsumtion.adapter = listConsumtionAdapter
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
