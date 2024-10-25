package com.weather

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = WeatherModule.NAME)
class WeatherModule(reactContext: ReactApplicationContext) :
  NativeWeatherSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }

  fun String.capitalizeWords(): String = split(" ").map { it.capitalize() }.joinToString(" ")

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  override fun capitalizeLetter(text: String): String {
    return text.capitalizeWords()
  }

  companion object {
    const val NAME = "Weather"
  }
}
