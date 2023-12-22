package com.techcare.healthbite.activity.detail

import android.graphics.Color
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.SpannableStringBuilder
import android.text.style.BulletSpan
import android.view.View
import android.widget.Toast
import androidx.activity.viewModels
import androidx.core.content.ContextCompat
import androidx.lifecycle.ViewModelProvider
import androidx.viewpager2.widget.ViewPager2
import com.bumptech.glide.Glide
import com.google.android.material.tabs.TabLayout
import com.google.android.material.tabs.TabLayoutMediator
import com.techcare.healthbite.R
import com.techcare.healthbite.databinding.ActivityDetailRecipeBinding
import com.techcare.healthbite.model.ViewModelFactory

class DetailRecipeActivity : AppCompatActivity() {
    private lateinit var binding: ActivityDetailRecipeBinding
    private val detailRecipeViewModel by viewModels<DetailRecipeViewModel> {
        ViewModelFactory.getInstance(application)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDetailRecipeBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnBack.setOnClickListener {
            finish()
        }
        supportActionBar?.hide()

        val getName = intent.getStringExtra(EXTRA_FOODNAME)
        val getId: Int = intent.getIntExtra(EXTRA_ID, 0)

        if (getId != 0 || getName == null) {
            detailRecipeViewModel.getDetailRecipe(getId)
            detailRecipeViewModel.detailRecipe.observe(this) { recipeResponse ->
                recipeResponse?.data?.recipe?.let { recipe ->
                    Glide.with(this@DetailRecipeActivity)
                        .load(recipe.recipePhoto)
                        .into(binding.imgFoodPhoto)
                    binding.foodName.text = recipe.recipeName
                    binding.foodDescription.text = recipe.description
                    val ingredientsText = formatArrayWithBulletSpan(recipe.ingredients)
                    val stepsText = formatArrayWithBulletSpan(recipe.steps)
                    val otherNutrientsText = formatArrayWithBulletSpan(recipe.otherNutrients)

                    binding.ingredientContent.text = ingredientsText
                    binding.cookMethodContent.text = stepsText
                    binding.contentNutrition.text = otherNutrientsText
                }
            }
        } else if (getId == 0 && getName != null) {
            detailRecipeViewModel.getDetailRecipeSmart(getName)
            detailRecipeViewModel.detailRecipeSmart.observe(this) { recipeResponse ->
                recipeResponse?.data?.recipe?.let { recipe ->
                    Glide.with(this@DetailRecipeActivity)
                        .load(recipe.recipePhoto)
                        .into(binding.imgFoodPhoto)
                    binding.foodName.text = recipe.recipeName
                    binding.foodDescription.text = recipe.description
                    val ingredientsText = formatArrayWithBulletSpan(recipe.ingredients)
                    val stepsText = formatArrayWithBulletSpan(recipe.steps)
                    val otherNutrientsText = formatArrayWithBulletSpan(recipe.otherNutrients)

                    binding.ingredientContent.text = ingredientsText
                    binding.cookMethodContent.text = stepsText
                    binding.contentNutrition.text = otherNutrientsText
                }
            }
        } else {
            Toast.makeText(this, "Kondisi tidak valid", Toast.LENGTH_SHORT).show()
        }

    }
    private fun formatArrayWithBulletSpan(array: List<String>): CharSequence {
        val builder = SpannableStringBuilder()
        for (item in array) {
            builder.append("\u2022 $item\n")
        }
        builder.setSpan(BulletSpan(16, Color.BLACK), 0, builder.length, 0)
        return builder
    }
    companion object {
        const val EXTRA_ID = "ID"
        const val EXTRA_FOODNAME = "FOODNAME"
    }
}
