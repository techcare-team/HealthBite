package com.techcare.healthbite.ui.customview

import android.content.Context
import android.graphics.Canvas
import android.graphics.drawable.Drawable
import android.text.Editable
import android.text.TextWatcher
import android.text.method.PasswordTransformationMethod
import android.util.AttributeSet
import android.view.View
import androidx.appcompat.widget.AppCompatEditText
import androidx.core.content.ContextCompat
import com.techcare.healthbite.R

class CVPasswordEdit : AppCompatEditText {
    private lateinit var iconFormInput: Drawable
    private var characterLength = 0

    constructor(context: Context) : super(context) {
        init()
    }

    constructor(context: Context, attrs: AttributeSet) : super(context, attrs) {
        init()
    }

    constructor(context: Context, attrs: AttributeSet, defStyleAttr: Int) : super(
        context,
        attrs,
        defStyleAttr
    ) {
        init()
    }

    private fun init() {
        iconFormInput = ContextCompat.getDrawable(context, R.drawable.logo_password) as Drawable
        showIconFormInput()
        addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {

            }
            override fun onTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {
                characterLength = s.length
                if (!s.isNullOrEmpty() && characterLength < 8) error = context.getString(R.string.label_validation_password)
            }
            override fun afterTextChanged(edt: Editable?) {

            }
        })
    }

    private fun showIconFormInput() {
        // Get the intrinsic width of the icon
        val iconWidth = iconFormInput.intrinsicWidth

        // Set the bounds for the icon
        iconFormInput.setBounds(0, 0, iconWidth, iconFormInput.intrinsicHeight)

        // Calculate the space between the icon and the text (8dp in pixels)
        val spaceWidth = (8 * resources.displayMetrics.density).toInt()

        // Set the bounds for the text, adding the space between the icon and the text
        setButtonDrawables(startOfTheText = iconFormInput, endOfTheText = null)

        // Set the padding to create space between the icon and the text
        setPadding(spaceWidth, 0, 0, 0)
    }


    private fun setButtonDrawables(
        startOfTheText: Drawable? = null,
        topOfTheText: Drawable? = null,
        endOfTheText: Drawable? = null,
        bottomOfTheText: Drawable? = null
    ){
        setCompoundDrawablesWithIntrinsicBounds(
            startOfTheText,
            topOfTheText,
            endOfTheText,
            bottomOfTheText
        )
    }

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        context.apply {
            setTextColor(ContextCompat.getColor(this, R.color.green_light))
            setHintTextColor(ContextCompat.getColor(this, R.color.green_light))
            background = ContextCompat.getDrawable(this, R.drawable.custom_view_form_input)
        }
        maxLines = 1
        textAlignment = View.TEXT_ALIGNMENT_VIEW_START
        transformationMethod = PasswordTransformationMethod.getInstance()
    }
}