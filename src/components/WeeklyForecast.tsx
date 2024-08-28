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
  const combinedArray = weatherInfos?.daily.time.map((time, index) => ({
    time,
    weather_code: weatherInfos?.daily.weather_code[index] as WeatherCode,
    temperature_2m_max: weatherInfos?.daily.temperature_2m_max[index],
  }));
  console.log(combinedArray);
  return (
    <View style={styles.mainView}>
      {combinedArray?.length ? (
        <ScrollView horizontal={true}>
          {combinedArray.map(
            ({ time, temperature_2m_max, weather_code }, i) => {
              return (
                <View key={i} style={styles.viewRow}>
                  <Text style={styles.subText}>{formatDate(time)}</Text>
                  <View style={styles.viewWeather}>
                    <Image
                      style={styles.weatherIcon}
                      source={{
                        uri: getWeatherImage(weather_code),
                      }}
                    />
                    <Text style={styles.temp}>
                      {Math.trunc(temperature_2m_max)} °C
                    </Text>
                  </View>
                  <Text style={styles.subText}>
                    {getWeatherDescription(weather_code)}
                  </Text>
                </View>
              );
            }
          )}
        </ScrollView>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    display: "flex",
    justifyContent: "center",
    marginTop: 18,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  viewRow: {
    display: "flex",
    flex: 1,
    paddingTop: 35,
    paddingBottom: 35,
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },
  weatherIcon: {
    width: 90,
    height: 60,
    marginTop: 20,
  },
  viewWeather: {
    textAlign: "center",
    justifyContent: "space-between",
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
});

export default WeeklyForecast;
