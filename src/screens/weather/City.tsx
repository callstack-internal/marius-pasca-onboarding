import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import clear_sky from '../../assets/images/clear_sky.png';
import few_clouds from '../../assets/images/few_clouds.png';
import scattered_clouds from '../../assets/images/scattered_clouds.png';
import broken_clouds from '../../assets/images/broken_clouds.png';
import shower_rain from '../../assets/images/shower_rain.png';
import rain from '../../assets/images/rain.png';
import thunderstorm from '../../assets/images/thunderstorm.png';
import snow from '../../assets/images/snow.png';
import mist from '../../assets/images/mist.png';
import chevron_right from '../../assets/images/chevron_right.png';
import { WeatherData } from '../../api/weather/types';

type Props = {
    navigateToDetails: () => void;
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

const capitalizeLetter = (text: string) => text.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

const CityListItem: React.FC<Props> = ({ navigateToDetails, data }) => {
    const weather = data.weather[0];

    return (
        <TouchableOpacity onPress={navigateToDetails} style={styles.container}>
            <View style={styles.cityContainer}>
                <View style={styles.cityDetails}>
                    <Image source={getIcon(weather.icon)} style={styles.weatherIcon} />
                    <View>
                        <Text style={styles.cityName}>{data.name}</Text>
                        <Text style={styles.cityWeather}>{capitalizeLetter(weather.description)}</Text>
                    </View>
                </View>
                <View style={styles.tempContainer}>
                    <Text style={styles.tempText}>{Math.round(data.main.temp)}°F</Text>
                </View>
            </View>
            <View style={styles.iconContainer}>
                <Image source={chevron_right} style={styles.rightIcon} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    iconContainer: {
        justifyContent: 'center',
    },
    cityContainer: {
        flex: 1,
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
    },
    cityWeather: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#909090',
    },
    weatherIcon: {
        width: 70,
        height: 70,
    },
    rightIcon: {
        width: 50,
        height: 50,
    },
    tempContainer: {
        backgroundColor: '#6aa9b8',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 50,
    },
    tempText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },
});

export default CityListItem;
