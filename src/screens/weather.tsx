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
    if (locations) {
      setLocationsInfos(locations[0]);
      getWeatherData();
    }
  }, [locations]);

  const getWeatherData = async () => {
    const { latitude, longitude } = locations?.[0] as geocoordinateResult;
    const weatherData = await getWeatherForecast(latitude, longitude);
    setWeatherInfos(weatherData);
    setLoading(false);
  };

  const LoadingView = () => {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#87CEEB" />
      </View>
    );
  };

  const showWeatherView = () => {
    return (
      <>
        <WeatherForecast
          weatherInfos={weatherInfos}
          locationsInfos={locationsInfos}
        />
        <WeeklyForecast weatherInfos={weatherInfos} />
      </>
    );
  };

  return <>{isLoading ? LoadingView() : showWeatherView()}</>;
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
