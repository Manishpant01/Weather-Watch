import React, { FC, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { WeatherForecast, WeeklyForecast } from "../components";
import {
  geocoordinateResult,
  getWeatherForecast,
  WeatherApiResponse,
} from "../services";

interface WeatherProps {
  locations: geocoordinateResult[] | null;
}

const Weather: FC<WeatherProps> = ({ locations }) => {
  const [weatherInfos, setWeatherInfos] = useState<WeatherApiResponse | null>(
    null
  );
  const [locationsInfos, setLocationsInfos] =
    useState<geocoordinateResult | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (locations && locations.length > 0) {
      setLocationsInfos(locations[0]);
      getWeatherData(locations[0]);
    } else {
      setLoading(false);
    }
  }, [locations]);

  const getWeatherData = async (location: geocoordinateResult) => {
    try {
      const { latitude, longitude } = location;
      if (latitude !== undefined && longitude !== undefined) {
        const weatherData = await getWeatherForecast(latitude, longitude);
        setWeatherInfos(weatherData);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const LoadingView = () => (
    <View
      testID="loading-indicator"
      style={[styles.container, styles.horizontal]}
    >
      <ActivityIndicator size="large" color="#87CEEB" />
    </View>
  );

  const showWeatherView = () => (
    <>
      <WeatherForecast
        weatherInfos={weatherInfos}
        locationsInfos={locationsInfos}
      />
      <WeeklyForecast weatherInfos={weatherInfos} />
    </>
  );

  return <>{isLoading ? <LoadingView /> : showWeatherView()}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default Weather;
