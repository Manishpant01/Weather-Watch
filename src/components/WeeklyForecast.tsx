import React, { FC } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { formatDate } from "../helpers/getFormatDate";
import getWeatherImage, {
  getWeatherDescription,
  WeatherCode,
} from "../helpers/getWeatherImage";
import { WeatherApiResponse } from "../services";

interface WeeklyForecastProps {
  weatherInfos: WeatherApiResponse | null;
}

const WeeklyForecast: FC<WeeklyForecastProps> = ({ weatherInfos }) => {
  const dailyData = weatherInfos?.daily || {
    time: [],
    weather_code: [],
    temperature_2m_max: [],
  };

  const forecasts = dailyData.time.map((time, index) => ({
    time,
    weather_code: dailyData.weather_code[index] as WeatherCode,
    temperature_2m_max: dailyData.temperature_2m_max[index],
  }));

  return (
    <View style={styles.mainView}>
      {forecasts.length > 0 ? (
        <ScrollView horizontal contentContainerStyle={styles.scrollView}>
          {forecasts.map(({ time, temperature_2m_max, weather_code }, i) => (
            <View key={i} style={styles.viewRow}>
              <Text style={styles.subText}>{formatDate(time)}</Text>
              <View style={styles.viewWeather}>
                <Image
                  style={styles.weatherIcon}
                  source={{ uri: getWeatherImage(weather_code) }}
                  //defaultSource={require("../imgs/default-weather.png")} // Fallback image
                />
                <Text style={styles.temp}>
                  {Math.trunc(temperature_2m_max)} °C
                </Text>
              </View>
              <Text style={styles.subText}>
                {getWeatherDescription(weather_code)}
              </Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noDataText}>No data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginTop: 18,
    paddingHorizontal: 16,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
  },
  viewRow: {
    paddingVertical: 35,
    alignItems: "center",
  },
  weatherIcon: {
    width: 90,
    height: 60,
    marginTop: 20,
  },
  viewWeather: {
    alignItems: "center",
  },
  temp: {
    marginBottom: 5,
    color: "#fff",
    fontWeight: "bold",
  },
  subText: {
    color: "#ddd",
  },
  noDataText: {
    color: "#ddd",
    textAlign: "center",
    fontSize: 16,
  },
});

export default WeeklyForecast;
