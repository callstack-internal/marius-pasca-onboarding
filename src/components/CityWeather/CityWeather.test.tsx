import React from 'react';
import { render } from '@testing-library/react-native';
import CityWeather from '.';
import { WEATHER_DATA } from '@api/weather/mock';

jest.mock('@assets/images/clear_sky.png', () => 'clear_sky.png');
jest.mock('@assets/images/few_clouds.png', () => 'few_clouds.png');
jest.mock('@assets/images/scattered_clouds.png', () => 'scattered_clouds.png');
jest.mock('@assets/images/broken_clouds.png', () => 'broken_clouds.png');
jest.mock('@assets/images/shower_rain.png', () => 'shower_rain.png');
jest.mock('@assets/images/rain.png', () => 'rain.png');
jest.mock('@assets/images/thunderstorm.png', () => 'thunderstorm.png');
jest.mock('@assets/images/snow.png', () => 'snow.png');
jest.mock('@assets/images/mist.png', () => 'mist.png');

describe("CityWeather Component", () => {
    it("renders correctly and matches snapshot", () => {
        const { toJSON } = render(<CityWeather data={WEATHER_DATA[0]} />);
        expect(toJSON()).toMatchSnapshot();
    });
});
