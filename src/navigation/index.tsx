import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WeatherList from '@screens/weather';
import WeatherDetails from '@screens/details';
import { RootStackParamList } from './types';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName='Weather' screenOptions={{
      headerStyle: {
        backgroundColor: '#f9794e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 18,
      },
    }}>
      <Stack.Screen name="Weather" component={WeatherList} />
      <Stack.Screen name="Details" component={WeatherDetails} />
    </Stack.Navigator>
  );
}