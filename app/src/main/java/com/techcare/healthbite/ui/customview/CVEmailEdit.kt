package com.techcare.healthbite.ui.customview

import android.content.Context
import android.graphics.Canvas
import android.graphics.drawable.Drawable
import android.text.Editable
import android.text.TextWatcher
import android.util.AttributeSet
import android.view.View
import androidx.appcompat.widget.AppCompatEditText
import androidx.core.content.ContextCompat
import com.techcare.healthbite.R

class CVEmailEdit : AppCompatEditText {
    private lateinit var iconFormInput: Drawable

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
        iconFormInput = ContextCompat.getDrawable(context, R.drawable.logo_email) as Drawable
        addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {
                // Do nothing.
            }

            override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {
                showIconFormInput()
                error = if (s.isNotEmpty()) {
                    if (!s.toString().matches(Regex("[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+"))) {
                        context.getString(R.string.label_invalid_email)
                    } else null
                } else null
            }

            override fun afterTextChanged(s: Editable) {
                // Do nothing.
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
        isSingleLine = true
        textAlignment = View.TEXT_ALIGNMENT_VIEW_START
    }
}