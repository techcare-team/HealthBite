package com.techcare.healthbite.data

import android.os.Parcelable
import kotlinx.parcelize.Parcelize


@Parcelize
data class Recipe(
    val photo:Int,
    val name:String,
    val calories:Int,
    val sugar:Int,
    val cholesterol:Int,
    val natrium:Int,
):Parcelable
