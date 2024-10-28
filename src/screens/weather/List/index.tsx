import React, { useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, ListRenderItem } from 'react-native';
import { NavigationTypes } from '@navigation/types';
import { WeatherData } from '@api/weather/types';
import WeatherListItem from '../ListItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '@styles/index';
import Header from '../Header';
import { WeatherContext } from '../context';
import { useNavigation } from '@react-navigation/native';

type Props = {};

const WeatherList: React.FC<Props> = () => {
    const navigation = useNavigation<NavigationTypes>();
    const { bottom } = useSafeAreaInsets();
    const { weatherQuery } = useContext(WeatherContext);
    const { isLoading, error, data, refetch } = weatherQuery || {};

    if (isLoading) return <View style={styles.placeholder}>
        <ActivityIndicator size="large" color={theme.colors.PRIMARY} testID='activity-indicator' />
    </View>;

    if (error) return <View style={styles.placeholder}>
        <Text style={styles.text}>Error fetching data.</Text>
    </View>;

    const renderItem: ListRenderItem<WeatherData> = ({ item }) => {
        const navigateToDetails = () => {
            navigation.navigate('Details', { data: item });
        }

        return <WeatherListItem data={item} navigateToDetails={navigateToDetails} />
    };

    const emptyComponent = () => <View style={styles.placeholder}>
        <Text style={styles.text}>There is no data available.</Text>
    </View>;

    return (
        <View style={styles.container}>
            <Header />
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                onRefresh={refetch}
                ListEmptyComponent={emptyComponent}
                refreshing={isLoading}
                ListFooterComponent={<View style={{ paddingBottom: bottom }} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    placeholder: {
        padding: 20,
    },
    text: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.GREY,
    }
});

export default WeatherList;
