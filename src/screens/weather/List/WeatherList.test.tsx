import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import WeatherList from './index';
import { WeatherContext } from '../context';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { WEATHER_DATA } from '@api/weather/mock';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
}));

const renderWithProviders = (weatherContextValue: any) => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });

    return render(
        <WeatherContext.Provider value={weatherContextValue}>
            <NavigationContainer>
                <WeatherList />
            </NavigationContainer>
        </WeatherContext.Provider>
    );
};

describe('WeatherList Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('shows loading indicator when data is loading', () => {
        renderWithProviders({
            weatherQuery: { isLoading: true, error: null, data: null, refetch: jest.fn() },
        });

        expect(screen.getByTestId('activity-indicator')).toBeTruthy();
    });

    it('displays an error message when there is an error', () => {
        renderWithProviders({
            weatherQuery: { isLoading: false, error: new Error('Error fetching data'), data: null, refetch: jest.fn() },
        });

        expect(screen.getByText('Error fetching data.')).toBeTruthy();
    });

    it('displays empty component when there is no data', () => {
        renderWithProviders({
            weatherQuery: { isLoading: false, error: null, data: [], refetch: jest.fn() },
        });

        expect(screen.getByText('There is no data available.')).toBeTruthy();
    });

    it('renders weather items when data is available', () => {
        renderWithProviders({
            weatherQuery: { isLoading: false, error: null, data: WEATHER_DATA, refetch: jest.fn() },
        });

        expect(screen.getByText('Kyiv')).toBeTruthy();
    });

    it('navigates to the details screen when an item is pressed', async () => {
        renderWithProviders({
            weatherQuery: { isLoading: false, error: null, data: WEATHER_DATA, refetch: jest.fn() },
        });

        fireEvent.press(screen.getByText('Kyiv'));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('Details', { data: WEATHER_DATA[0] });
        });
    });
});
