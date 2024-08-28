import { WeatherCode } from "../helpers/getWeatherImage";

export type geocoordinateResult = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id?: number;
  admin3_id?: number;
  timezone: string;
  population?: number;
  postcodes?: string[];
  country_id: number;
  country: string;
  admin1: string;
  admin2?: string;
  admin3?: string;
} & Record<string, any>;

export type geocoordinateApiResponse = {
  results: geocoordinateResult[];
  generationtime_ms: number;
} & Record<string, any>;

export interface WeatherApiResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    weather_code: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    weather_code: WeatherCode;
  };
  daily_units: {
    time: string;
    weather_code: WeatherCode;
    temperature_2m_max: string;
  };
  daily: {
    time: string[];
    weather_code: WeatherCode;
    temperature_2m_max: number[];
  };
}
