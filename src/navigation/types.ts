import { WeatherData } from "@api/weather/types";
import { NavigationProp } from "@react-navigation/native";

export type RootStackParamList = {
    Weather: undefined;
    Details: { data: WeatherData };
};

export type NavigationTypes = NavigationProp<RootStackParamList>;