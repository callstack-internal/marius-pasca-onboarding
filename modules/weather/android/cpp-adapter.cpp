#include <jni.h>
#include <string>
#include "react-native-weather.h"

std::string jstringToString(JNIEnv *env, jstring jStr)
{
    if (!jStr)
    {
        return ""; // Return empty string if jstring is null
    }

    const char *chars = env->GetStringUTFChars(jStr, NULL);
    std::string str(chars);
    env->ReleaseStringUTFChars(jStr, chars);

    return str;
}

jstring stringToJstring(JNIEnv *env, const std::string &str)
{
    return env->NewStringUTF(str.c_str());
}

extern "C" JNIEXPORT jstring JNICALL
Java_com_weather_WeatherModule_nativeCapitalizeLetter(JNIEnv *env, jclass type, jstring text)
{
    std::string nativeText = jstringToString(env, text);

    std::string capitalizedText = weather::capitalizeLetter(nativeText);

    return stringToJstring(env, capitalizedText);
}
