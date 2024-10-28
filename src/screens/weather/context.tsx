import { useGroupWeather } from "@api/weather";
import { DEFAULT_CITY_IDS } from "@api/weather/mock";
import { WeatherData } from "@api/weather/types";
import { UseQueryResult } from "@tanstack/react-query";
import { createContext, useMemo, useState, PropsWithChildren } from "react";

export const WeatherContext = createContext<{
    search?: string,
    setSearch?: (search: string) => void,
    weatherQuery?: UseQueryResult<WeatherData[], Error>;
}>({});

const filterCities = (cities: { [city: string]: number }, searchText: string) => {
    return Object.fromEntries(
        Object.entries(cities).filter(([city]) =>
            city.toLowerCase().includes(searchText.toLowerCase())
        )
    );
};

export const WeatherProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [search, setSearch] = useState('');

    const cities = useMemo(() => {
        const citiesObj = search ? filterCities(DEFAULT_CITY_IDS, search) : DEFAULT_CITY_IDS;
        return Object.values(citiesObj)
    }, [search]);

    const weatherQuery = useGroupWeather(cities);
    const data = weatherQuery.data?.filter((city) => cities.includes(city.id));

    return (
        <WeatherContext.Provider value={{ search, setSearch, weatherQuery: { ...weatherQuery, data } as UseQueryResult<WeatherData[], Error> }}>
            {children}
        </WeatherContext.Provider>
    );
};