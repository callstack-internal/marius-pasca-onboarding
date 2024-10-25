import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import clear_sky from '@assets/images/clear_sky.png';
import few_clouds from '@assets/images/few_clouds.png';
import scattered_clouds from '@assets/images/scattered_clouds.png';
import broken_clouds from '@assets/images/broken_clouds.png';
import shower_rain from '@assets/images/shower_rain.png';
import rain from '@assets/images/rain.png';
import thunderstorm from '@assets/images/thunderstorm.png';
import snow from '@assets/images/snow.png';
import mist from '@assets/images/mist.png';
import { WeatherData } from '@api/weather/types';
import { capitalizeLetter } from 'react-native-weather';
import { theme } from '@styles/index';

type Props = {
    data: WeatherData;
}

const getIcon = (icon: string) => {
    const iconMap: { [key: string]: string } = {
        "01d": clear_sky,
        "02d": few_clouds,
        "03d": scattered_clouds,
        "04d": broken_clouds,
        "09d": shower_rain,
        "10d": rain,
        "11d": thunderstorm,
        "13d": snow,
        "50d": mist,
    };

    return iconMap[icon.replace('n', 'd')] || clear_sky
}

const CityWeather: React.FC<Props> = ({ data }) => {
    const weather = data.weather[0];

    return (
        <View style={styles.cityContainer} testID="city_weather_component">
            <View style={styles.cityDetails}>
                <Image source={getIcon(weather.icon)} style={styles.weatherIcon} />
                <View>
                    <Text style={styles.cityName}>{data.name}</Text>
                    <Text style={styles.cityWeather}>{capitalizeLetter(weather.description)}</Text>
                </View>
            </View>
            <View style={styles.tempContainer}>
                <Text style={styles.tempText}>{data.main.temp.toFixed(1)}°F</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cityContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cityDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    cityName: {
        fontSize: 18,
        fontWeight: '500',
    },
    cityWeather: {
        fontSize: 14,
        fontWeight: '700',
        color: theme.colors.GREY,
    },
    weatherIcon: {
        width: 70,
        height: 70,
    },
    tempContainer: {
        backgroundColor: theme.colors.SECONDARY,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 50,
    },
    tempText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: theme.colors.WHITE,
    },
});

export default CityWeather;
