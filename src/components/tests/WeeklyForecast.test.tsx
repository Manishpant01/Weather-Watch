import { render } from "@testing-library/react-native";
import React from "react";
import WeeklyForecast from "../WeeklyForecast";

describe("WeeklyForecast Component", () => {
  it("renders forecast data correctly", () => {
    const weatherInfos = {
      daily: {
        time: ["2024-08-29", "2024-08-30"],
        weather_code: ["3", "2"],
        temperature_2m_max: [30, 25],
      },
    };

    const { getByText, getAllByTestId } = render(
      <WeeklyForecast weatherInfos={weatherInfos} />
    );

    expect(getByText("Aug 29")).toBeTruthy();
    expect(getByText("Aug 29")).toBeTruthy();

    expect(getByText("30 °C")).toBeTruthy();
    expect(getByText("25 °C")).toBeTruthy();

    const weatherIcon = getAllByTestId(/weather-icon-/);
    expect(weatherIcon.length).toBe(2);
    expect(weatherIcon[0].props.source.uri).toBe(
      "http://openweathermap.org/img/wn/03d@2x.png"
    );
    expect(weatherIcon[1].props.source.uri).toBe(
      "http://openweathermap.org/img/wn/02d@2x.png"
    );
  });

  it("renders no data available message when no forecast data is provided", () => {
    const { getByText } = render(<WeeklyForecast weatherInfos={null} />);
    expect(getByText("No data available")).toBeTruthy();
  });
});
