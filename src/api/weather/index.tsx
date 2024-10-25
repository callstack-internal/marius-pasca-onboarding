import { useQuery } from "@tanstack/react-query";
import { API_KEY } from "@env"
import { WeatherData } from "./types";

export const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/group';

const fetchGroupCities = async (cityIds: number[]): Promise<WeatherData[]> => {
    const cityIdsString = cityIds.join(',');
    const response = await fetch(`${WEATHER_API_URL}?id=${cityIdsString}&appid=${API_KEY}&units=imperial`);

    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    return data.list;
};

export function useGroupWeather(cityIds: number[]) {
    return useQuery({ queryKey: ['groupWeather'], queryFn: () => fetchGroupCities(cityIds) });
}