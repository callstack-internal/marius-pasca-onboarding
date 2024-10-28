import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WeatherComponent from '@screens/weather';
import WeatherDetails from '@screens/details';
import { RootStackParamList } from './types';
import { theme } from '@styles/index';

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
        backgroundColor: theme.colors.PRIMARY,
      },
      headerTintColor: theme.colors.WHITE,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 18,
      },
    }}>
      <Stack.Screen name="Weather" component={WeatherComponent} options={{ headerShown: false }} />
      <Stack.Screen name="Details" component={WeatherDetails} />
    </Stack.Navigator>
  );
}