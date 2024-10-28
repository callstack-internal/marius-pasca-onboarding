import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WeatherListItem from '.';
import { WEATHER_DATA } from '@api/weather/mock';

const mockNavigateToDetails = jest.fn();

describe('WeatherListItem Component', () => {
    it('renders the CityWeather component with the correct data', () => {
        const { getByTestId } = render(
            <WeatherListItem navigateToDetails={mockNavigateToDetails} data={WEATHER_DATA[0]} />
        );

        expect(getByTestId('city_weather_component')).toBeTruthy();
    });

    it('calls navigateToDetails when pressed', () => {
        const { getByTestId } = render(
            <WeatherListItem navigateToDetails={mockNavigateToDetails} data={WEATHER_DATA[0]} />
        );

        const touchable = getByTestId('navigat_to_details');
        fireEvent.press(touchable);

        expect(mockNavigateToDetails).toHaveBeenCalled();
    });
});
