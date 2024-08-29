import { render } from "@testing-library/react-native";
import React from "react";
import WeatherForecast from "../WeatherForecast";
import { geocoordinateResult, WeatherApiResponse } from "../../services";

jest.mock("../../helpers/getFormatDate.ts", () => ({
  formateDate: jest.fn(() => "2024-08-29"),
}));

jest.mock("../../helpers/getWeatherImage", () => ({
  __esModule: true,
  default: jest.fn(() => "http://example.com/weather-icon.png"),
  getWeatherDescription: jest.fn(() => "Sunny"),
}));

describe("WeatherForecast Component", () => {
  it("renders correctly with valid props", () => {
    const mockLocation: geocoordinateResult = {
      name: "New York",
      country: "US",
      latitude: 40.7128,
      longitude: -74.006,
    };

    const mockWeather: WeatherApiResponse = {
      current: {
        weather_code: "3",
        time: "",
        interval: 999,
        temperature_2m: 25,
      },
      daily: {
        time: [],
        temperature_2m_max: [],
        weather_code: "3",
      },
    };

    const { getByText, getByTestId } = render(
      <WeatherForecast
        locationsInfos={mockLocation}
        weatherInfos={mockWeather}
      />
    );

    expect(getByText("New York, US")).toBeTruthy();
    expect(getByText("2024-08-29")).toBeTruthy();
    expect(getByText("25 °C")).toBeTruthy();
    expect(getByText("Sunny")).toBeTruthy();
  });

  it("should render the correct image source", () => {
    const { getByTestId } = render(
      <WeatherForecast
        locationsInfos={
          { name: "New York", country: "US" } as geocoordinateResult
        }
        weatherInfos={{
          current: { weather_code: "3", temperature_2m: 25 },
          daily: {
            time: [],
            temperature_2m_max: [],
            weather_code: "3",
            interval: 999,
          },
        }}
      />
    );

    const weatherIcon = getByTestId("weather-icon");
    expect(weatherIcon.props.source).toEqual({
      uri: "http://example.com/weather-icon.png",
    });
  });

  it("renders correctly with null props", () => {
    const { getByText, queryByTestId } = render(
      <WeatherForecast locationsInfos={null} weatherInfos={null} />
    );

    expect(getByText("Location not available")).toBeTruthy();
    expect(getByText("2024-08-29")).toBeTruthy();
    expect(getByText("0 °C")).toBeTruthy();
  });
});
