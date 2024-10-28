import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import chevron_right from '@assets/images/chevron_right.png';
import { WeatherData } from '@api/weather/types';
import CityWeather from '@components/CityWeather';
import { theme } from '@styles/index';

type Props = {
    navigateToDetails: () => void;
    data: WeatherData;
}

const WeatherListItem: React.FC<Props> = ({ navigateToDetails, data }) => {
    return (
        <TouchableOpacity onPress={navigateToDetails} style={styles.container} testID='navigat_to_details'>
            <View style={styles.cityContainer}>
                <CityWeather data={data} />
            </View>
            <View style={styles.iconContainer}>
                <Image source={chevron_right} style={styles.rightIcon} testID='chevron_right' />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.WHITE,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.GREY_LIGHT,
    },
    cityContainer: {
        flex: 1,
    },
    iconContainer: {
        justifyContent: 'center',
    },
    rightIcon: {
        width: 50,
        height: 50,
    },
});

export default WeatherListItem;
