import { fetchAPI } from "./apiHandler";
import { geocoordinateApiResponse, WeatherApiResponse } from "./types";

// info: get latitude and longitude for a given location
export const getGeocoordinate = async (locationText: string = "gurugram") => {
  const data = await fetchAPI<geocoordinateApiResponse>(
    `https://geocoding-api.open-meteo.com/v1/search?name=${locationText}`
  );
  return data;
};

// info: get Weather Forecast for a given location and using default timezone GMT
export const getWeatherForecast = async (
  latitude: number,
  longitude: number,
  current: string = "temperature_2m"
) => {
  const data = await fetchAPI<WeatherApiResponse>(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=${current}&current=weather_code&daily=weather_code,temperature_2m_max`
  );
  return data;
};
