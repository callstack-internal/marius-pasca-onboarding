import { WeatherData } from "@api/weather/types";

export type RootStackParamList = {
    Weather: undefined;
    Details: { data: WeatherData };
};