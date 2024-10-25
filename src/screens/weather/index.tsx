import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, ListRenderItem } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import { useGroupWeather } from '@api/weather';
import { WeatherData } from '@api/weather/types';
import WeatherListItem from './WeatherListItem';
import { DEFAULT_CITY_IDS } from '@api/weather/mock';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '@styles/index';

type Props = NativeStackScreenProps<RootStackParamList, 'Weather'>;

const WeatherList: React.FC<Props> = ({ navigation }) => {
  const { bottom } = useSafeAreaInsets();
  const { data, isLoading, error, refetch } = useGroupWeather(DEFAULT_CITY_IDS);

  if (isLoading) return <View style={styles.placeholder}>
    <ActivityIndicator size="large" color={theme.colors.PRIMARY} />
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
