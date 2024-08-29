import React, { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
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
}) => {
  const locationName = locationsInfos
    ? `${locationsInfos.name}, ${locationsInfos.country}`
    : "Location not available";
  const weatherCode = weatherInfos?.current?.weather_code ?? "0";
  const temperature = weatherInfos?.current?.temperature_2m ?? 0;
  const weatherDescription = getWeatherDescription(weatherCode);

  return (
    <View style={styles.mainView}>
      <View style={styles.infos}>
        <Text style={styles.name}>{locationName}</Text>
        <Text style={styles.subText}>{formateDate()}</Text>
        <Image
          testID="weather-icon"
          style={styles.weatherIcon}
          source={{ uri: getWeatherImage(weatherCode) }}
          //  defaultSource={require("../imgs/default-weather.png")} // Fallback image
        />
        <Text style={styles.temp}>{Math.trunc(temperature)} °C</Text>
        <Text style={styles.subText}>{weatherDescription}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginTop: 10,
  },
  infos: {
    padding: 10,
    justifyContent: "center",
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
