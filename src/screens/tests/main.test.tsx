import { render, screen, waitFor } from "@testing-library/react-native";
import React from "react";
import { LocationList, SearchInput } from "../../components";
import { getGeocoordinate } from "../../services";
import { geocoordinateApiResponse } from "../../services/types";
import Main from "../main";
import Weather from "../weather";

jest.mock("../../services/index.ts", () => ({
  getGeocoordinate: jest.fn(),
}));

jest.mock("../../components/SearchInput.tsx", () => ({
  __esModule: true,
  default: jest.fn(() => <></>),
}));

jest.mock("../weather.tsx", () => ({
  __esModule: true,
  default: jest.fn(() => <></>),
}));

jest.mock("../../components/showLocationList.tsx", () => ({
  __esModule: true,
  default: jest.fn(() => <></>),
}));

const mockGetGeocoordinate = getGeocoordinate as jest.MockedFunction<
  typeof getGeocoordinate
>;

const mockData: geocoordinateApiResponse = {
  results: [
    {
      id: 1270498,
      name: "Haldwani",
      latitude: 29.22254,
      longitude: 79.5286,
      elevation: 447,
      feature_code: "PPL",
      country_code: "IN",
      admin1_id: 1444366,
      timezone: "Asia/Kolkata",
      population: 139497,
      country_id: 1269750,
      country: "India",
      admin1: "Uttarakhand",
    },
  ],
  generationtime_ms: 1.0279417,
};

const mockData2: geocoordinateApiResponse = {
  results: [
    {
      id: 1270498,
      name: "Haldwani",
      latitude: 29.22254,
      longitude: 79.5286,
      elevation: 447,
      feature_code: "PPL",
      country_code: "IN",
      admin1_id: 1444366,
      timezone: "Asia/Kolkata",
      population: 139497,
      country_id: 1269750,
      country: "India",
      admin1: "Uttarakhand",
    },
    {
      id: 10813804,
      name: "Haldwāni Malli",
      latitude: 29.20698,
      longitude: 79.52562,
      elevation: 430,
      feature_code: "PPL",
      country_code: "IN",
      admin1_id: 1444366,
      timezone: "Asia/Kolkata",
      country_id: 1269750,
      country: "India",
      admin1: "Uttarakhand",
    },
  ],
  generationtime_ms: 1.0279417,
};

describe("Main Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render the component correctly", () => {
    render(<Main />);
    expect(screen.getByTestId("main-component")).toBeTruthy();
  });

  test("should display loading indicator initially", () => {
    mockGetGeocoordinate.mockResolvedValue(mockData);
    render(<Main />);
    expect(screen.getByTestId("activity-indicator")).toBeTruthy();
  });

  test("should render Search Input component", async () => {
    mockGetGeocoordinate.mockResolvedValue(mockData);
    render(<Main />);

    expect(screen.getByTestId("activity-indicator")).toBeTruthy();

    await waitFor(() => {
      expect(screen.queryByTestId("activity-indicator")).toBeNull();
      expect(SearchInput).toHaveBeenCalled();
    });
  });

  test("should render location list component", async () => {
    mockGetGeocoordinate.mockResolvedValue(mockData2);
    render(<Main />);

    expect(screen.getByTestId("activity-indicator")).toBeTruthy();

    await waitFor(() => {
      expect(screen.queryByTestId("activity-indicator")).toBeNull();
      expect(LocationList).toHaveBeenCalled();
    });
  });

  test("should render Weather component", async () => {
    mockGetGeocoordinate.mockResolvedValue(mockData);

    render(<Main />);

    expect(screen.getByTestId("activity-indicator")).toBeTruthy();

    await waitFor(() => {
      expect(screen.queryByTestId("activity-indicator")).toBeNull();
      expect(Weather).toHaveBeenCalled();
    });
  });
});
