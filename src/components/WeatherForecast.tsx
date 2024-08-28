import React, { FC } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { formateDate } from "../helpers/getFormatDate";
import getWeatherImage, {
  getWeatherDescription,
} from "../helpers/getWeatherImage";
import { geocoordinateResult, WeatherApiResponse } from "../services";

interface WeatherForecastProps {
  locationsInfos: geocoordinateResult | null;
  weatherInfos: WeatherApiResponse | null;
}

const WeatherForecast: FC<WeatherForecastProps> = ({
  locationsInfos,
  weatherInfos,
}) => (
  <View style={styles.mainView}>
    <View style={styles.infos}>
      <Text
        style={styles.name}
      >{`${locationsInfos?.name}, ${locationsInfos?.country}`}</Text>
      <Text style={styles.subText}>{formateDate()}</Text>
      <Image
        style={styles.weatherIcon}
        source={{
          uri: getWeatherImage(
            (weatherInfos as WeatherApiResponse)?.current.weather_code
          ),
        }}
      />
      <Text style={styles.temp}>
        {Math.trunc(weatherInfos?.current?.temperature_2m || 0)} °C
      </Text>
      <Text style={styles.subText}>
        {getWeatherDescription(
          (weatherInfos as WeatherApiResponse)?.current.weather_code
        )}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  mainView: {
    marginTop: 10,
  },
  infos: {
    display: "flex",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    marginTop: 20,
  },
  weatherIcon: {
    width: 120,
    height: 80,
    marginTop: 20,
  },
  temp: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#fff",
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  subText: {
    color: "#ddd",
  },
});

export default WeatherForecast;
