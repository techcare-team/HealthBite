package com.techcare.healthbite.ui.recipe

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.Menu
import android.view.MenuInflater
import android.view.MenuItem
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.widget.SearchView
import androidx.fragment.app.viewModels
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.techcare.healthbite.R
import com.techcare.healthbite.adapter.ListRecipeAdapter
import com.techcare.healthbite.databinding.FragmentRecipeBinding
import com.techcare.healthbite.response.DataItem

class RecipeFragment : Fragment() {

    private lateinit var rvRecipe: RecyclerView
    private var _binding: FragmentRecipeBinding? = null
    private lateinit var searchView: SearchView
    private lateinit var filterItem: MenuItem
    private val recipeViewModel by viewModels<RecipeViewModel>()
    private val binding get() = _binding!!

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setHasOptionsMenu(true)

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentRecipeBinding.inflate(inflater, container, false)
        val root: View = binding.root

        binding.rvRecipe.setHasFixedSize(true)

        rvRecipe = binding.rvRecipe

        recipeViewModel.listRecipe.observe(viewLifecycleOwner) { list ->
            if (list != null) {
                setRecipeData(list)
            }
        }


        val layoutManager = LinearLayoutManager(requireContext())
        binding.rvRecipe.layoutManager = layoutManager

        recipeViewModel.listRecipe.observe(viewLifecycleOwner) { list ->
            setRecipeData(list)
        }

        return root
    }

    override fun onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) {
        inflater.inflate(R.menu.option_menu_recipe, menu)

        val searchItem = menu.findItem(R.id.action_search)
        searchView = searchItem.actionView as SearchView

        filterItem = menu.findItem(R.id.action_filter)
    }




    private fun setRecipeData(listUser: List<DataItem>) {
        val adapter = ListRecipeAdapter()
        adapter.submitList(listUser)
        binding.rvRecipe.adapter = adapter
    }


    private fun ifUserNotFound(isDataNotFound: Boolean) {
        binding.apply {
            if (isDataNotFound) {
                rvRecipe.visibility = View.GONE
//                tvNotFound.visibility = View.VISIBLE
            } else {
                rvRecipe.visibility = View.VISIBLE
//                tvNotFound.visibility = View.GONE
            }
        }
    }
}
