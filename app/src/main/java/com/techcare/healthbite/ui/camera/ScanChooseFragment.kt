package com.techcare.healthbite.ui.camera

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.techcare.healthbite.databinding.FragmentScanChooseBinding

class ScanChooseFragment : Fragment() {

    private var _binding: FragmentScanChooseBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentScanChooseBinding.inflate(inflater, container, false)
        val root: View = binding.root

        binding.btnFood.setOnClickListener {
            val i = Intent(requireActivity(), CameraFoodActivity::class.java)
            startActivity(i)
        }

        binding.btnIngredient.setOnClickListener {
            val i = Intent(requireActivity(), CameraIngredientActivity::class.java)
            startActivity(i)
        }

        return root
    }

    companion object {

    }
}