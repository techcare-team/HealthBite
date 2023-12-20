package com.techcare.healthbite.ui.recipe

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.techcare.healthbite.R
import com.techcare.healthbite.adapter.ListRecipeAdapter
import com.techcare.healthbite.data.Recipe
import com.techcare.healthbite.databinding.FragmentRecipeBinding

class RecipeFragment : Fragment() {

    private lateinit var rvRecipe: RecyclerView
    private var _binding: FragmentRecipeBinding? = null
    private val binding get() = _binding!!

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Hide the action bar
        //(activity as AppCompatActivity?)?.supportActionBar?.hide()
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentRecipeBinding.inflate(inflater, container, false)
        val root: View = binding.root

        binding.rvRecipe.setHasFixedSize(true)

        rvRecipe = binding.rvRecipe

        showRecyclerList()
        return root
    }

    private fun getListRecipe(): ArrayList<Recipe> {
        val dataImage = resources.obtainTypedArray(R.array.data_photo)
        val dataName = resources.getStringArray(R.array.data_name)
        val dataCalories = resources.getIntArray(R.array.data_calories)
        val dataSugar = resources.getIntArray(R.array.data_sugar)
        val dataCholesterol = resources.getIntArray(R.array.data_cholesterol)
        val dataNatrium = resources.getIntArray(R.array.data_natrium)

        val listRecipe = ArrayList<Recipe>()
        for (i in dataName.indices) {
            val recipe = Recipe(dataImage.getResourceId(i, -1),dataName[i],  dataCalories[i], dataSugar[i], dataCholesterol[i], dataNatrium[i])
            listRecipe.add(recipe)
        }
        return listRecipe
    }

    private fun showRecyclerList() {
        rvRecipe.layoutManager = LinearLayoutManager(requireContext())
        val listRecipeAdapter = ListRecipeAdapter(getListRecipe())
        rvRecipe.adapter = listRecipeAdapter
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
//        (activity as AppCompatActivity?)?.supportActionBar?.show()
    }
}
