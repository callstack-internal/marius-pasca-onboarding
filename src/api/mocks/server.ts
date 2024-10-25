import { WEATHER_API_URL } from '@api/weather';
import { WEATHER_DATA } from '@api/weather/mock';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/native';

export const server = setupServer(
    http.get(WEATHER_API_URL, () => {
        return HttpResponse.json({ list: WEATHER_DATA });
    })
);

server.listen();