package com.techcare.healthbite.ui.camera

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.media.ThumbnailUtils
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.MediaStore
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.content.ContextCompat
import com.techcare.healthbite.R
import com.techcare.healthbite.databinding.ActivityCameraFoodBinding
import com.techcare.healthbite.ml.FoodModel
import org.tensorflow.lite.DataType
import org.tensorflow.lite.support.tensorbuffer.TensorBuffer
import java.io.IOException
import java.nio.ByteBuffer
import java.nio.ByteOrder

class CameraFoodActivity : AppCompatActivity() {

    private lateinit var binding: ActivityCameraFoodBinding
    private val imageSize = 224

    private val cameraLauncher =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            if (result.resultCode == RESULT_OK) {
                val data: Intent? = result.data
                val image = data?.extras?.get("data") as Bitmap
                val dimension = minOf(image.width, image.height)
                val thumbnail = ThumbnailUtils.extractThumbnail(image, dimension, dimension)
                binding.imgItemPhoto.setImageBitmap(thumbnail)

                val scaledImage = Bitmap.createScaledBitmap(thumbnail, imageSize, imageSize, false)
                classifyImage(scaledImage)
            }
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCameraFoodBinding.inflate(layoutInflater)
        setContentView(binding.root)

        supportActionBar?.hide()


        binding.btnOpenCamera.setOnClickListener { startCameraX() }
        binding.btnPickGallery.setOnClickListener { startGallery() }
    }

    private fun startCameraX() {
        if (ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.CAMERA
            ) == PackageManager.PERMISSION_GRANTED
        ) {
            val cameraIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
            cameraLauncher.launch(cameraIntent)
        } else {
            requestPermissions(arrayOf(Manifest.permission.CAMERA), 100)
        }
    }

    private fun classifyImage(image: Bitmap) {
        try {
            val model = FoodModel.newInstance(applicationContext)

            val inputFeature0 =
                TensorBuffer.createFixedSize(intArrayOf(1, 224, 224, 3), DataType.FLOAT32)
            val byteBuffer = ByteBuffer.allocateDirect(4 * imageSize * imageSize * 3)
            byteBuffer.order(ByteOrder.nativeOrder())

            val intValues = IntArray(imageSize * imageSize)
            image.getPixels(intValues, 0, image.width, 0, 0, image.width, image.height)
            var pixel = 0
            for (i in 0 until imageSize) {
                for (j in 0 until imageSize) {
                    val `val` = intValues[pixel++]
                    byteBuffer.putFloat(((`val` shr 16) and 0xFF) * (1f / 255f))
                    byteBuffer.putFloat(((`val` shr 8) and 0xFF) * (1f / 255f))
                    byteBuffer.putFloat((`val` and 0xFF) * (1f / 255f))
                }
            }

            inputFeature0.loadBuffer(byteBuffer)

            val outputs = model.process(inputFeature0)
            val outputFeature0 = outputs.getOutputFeature0AsTensorBuffer()

            val confidences = outputFeature0.floatArray
            var maxPos = 0
            var maxConfidence = 0f
            for (i in confidences.indices) {
                if (confidences[i] > maxConfidence) {
                    maxConfidence = confidences[i]
                    maxPos = i
                }
            }

            val classes = arrayOf(
                "Ayam_Crispy",
                "Ayam_Kecap",
                "Ayam_Serundeng",
                "Bakso",
                "Brownies",
                "Bubur_Ayam",
                "Capcay",
                "Cumi_Bakar",
                "Cumi_Hitam",
                "Cumi_Rica",
                "Dimsum_Ikan",
                "Garang_Asem",
                "Ikan_Bakar",
                "Ikan_Goreng",
                "Kentang_Balado",
                "Kue_Bolu",
                "Nasi_Bakar",
                "Nasi_Goreng",
                "Nasi_Kuning",
                "Nasi_Merah",
                "Nasi_Rames",
                "Opor_Ayam",
                "Pancake",
                "Pecel",
                "Pepes_Ikan",
                "Perkedel_Kentang",
                "Pukis",
                "Rawon",
                "Rendang",
                "Salad_Sayur",
                "Sate_Ayam",
                "Sate_Kambing",
                "Sayur_Asem",
                "Sayur_Sop",
                "Soto_Ayam",
                "Telur_Balado",
                "Telur_Dadar",
                "Tumis_Kacang_Panjang_Tahu",
                "Tumis_Kangkung",
                "Tumis_Terong",
                "Udang_Asam_Manis",
                "Udang_Goreng_Tepung"
            )

            binding.result.text = classes[maxPos]

            model.close()
        } catch (e: IOException) {
            e.printStackTrace()
            showToast("Error processing image.")
        }
    }

    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }

    private fun startGallery() {
        val intent = Intent()
        intent.action = Intent.ACTION_GET_CONTENT
        intent.type = "image/*"
        val chooser = Intent.createChooser(intent, getString(R.string.choose_picture))
        launcherIntentGallery.launch(chooser)
    }

    private val launcherIntentGallery = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == RESULT_OK) {
            val selectedImg: Uri = result.data?.data as Uri

            val imageBitmap = loadBitmapFromUri(selectedImg)

            binding.imgItemPhoto.setImageBitmap(imageBitmap)

            classifyImage(imageBitmap)
        }
    }

    private fun loadBitmapFromUri(uri: Uri): Bitmap {
        return try {
            val inputStream = contentResolver.openInputStream(uri)
            BitmapFactory.decodeStream(inputStream)
        } catch (e: IOException) {
            e.printStackTrace()
            showToast("Error loading image from gallery.")
            Bitmap.createBitmap(imageSize, imageSize, Bitmap.Config.ARGB_8888)
        }
    }

}