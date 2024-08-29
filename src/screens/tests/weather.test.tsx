import { render, screen, waitFor } from "@testing-library/react-native";
import React from "react";
import { WeatherForecast, WeeklyForecast } from "../../components";
import { geocoordinateResult, getWeatherForecast } from "../../services";
import Weather from "../weather";

jest.mock("../../services", () => ({
  getWeatherForecast: jest.fn(),
}));

jest.mock("../../components/WeatherForecast.tsx", () => ({
  __esModule: true,
  default: jest.fn(() => <></>),
}));

jest.mock("../../components/WeeklyForecast.tsx", () => ({
  __esModule: true,
  default: jest.fn(() => <></>),
}));

describe("Weather Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render Weather Forecast component correctly with valid locations", async () => {
    const mockLocation: geocoordinateResult = {
      latitude: 40.7128,
      longitude: -74.006,
    } as geocoordinateResult;
    const mockWeatherData = {
      current: { temperature: 20, condition: "Clear" },
      weekly: [
        { day: "Monday", temperature: 22 },
        { day: "Tuesday", temperature: 18 },
      ],
    };

    (getWeatherForecast as jest.Mock).mockResolvedValue(mockWeatherData);

    render(<Weather locations={[mockLocation]} />);

    expect(screen.getByTestId("loading-indicator")).toBeTruthy();

    await waitFor(() => {
      expect(screen.queryByTestId("loading-indicator")).toBeNull();
      expect(WeatherForecast).toHaveBeenCalledTimes(1);
      expect(WeatherForecast).toHaveBeenCalledWith(
        expect.objectContaining({
          weatherInfos: mockWeatherData,
          locationsInfos: mockLocation,
        }),
        {}
      );
    });
  });

  test("should render WeeklyForecast component with valid weather data", async () => {
    const mockLocation: geocoordinateResult = {
      latitude: 40.7128,
      longitude: -74.006,
    } as geocoordinateResult;

    const mockWeatherData = {
      current: { temperature: 20, condition: "Clear" },
      weekly: [
        { day: "Monday", temperature: 22 },
        { day: "Tuesday", temperature: 18 },
      ],
    };

    (getWeatherForecast as jest.Mock).mockResolvedValue(mockWeatherData);

    render(<Weather locations={[mockLocation]} />);
    expect(screen.getByTestId("loading-indicator")).toBeTruthy();

    await waitFor(() => {
      expect(screen.queryByTestId("loading-indicator")).toBeNull();

      expect(WeeklyForecast).toHaveBeenCalledTimes(1);
      expect(WeeklyForecast).toHaveBeenCalledWith(
        expect.objectContaining({
          weatherInfos: mockWeatherData,
        }),
        {}
      );
    });
  });

  test("should handle empty locations list", async () => {
    render(<Weather locations={null} />);

    await waitFor(() => {
      expect(screen.queryByRole("activityindicator")).toBeNull();
    });
  });

  test("should handle error during data fetching", async () => {
    const mockLocation: geocoordinateResult = {
      latitude: 40.7128,
      longitude: -74.006,
    } as geocoordinateResult;

    (getWeatherForecast as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch")
    );

    render(<Weather locations={[mockLocation]} />);
    expect(screen.getByTestId("loading-indicator")).toBeTruthy();

    await waitFor(() => {
      expect(screen.queryByTestId("loading-indicator")).toBeNull();
    });
  });
});
