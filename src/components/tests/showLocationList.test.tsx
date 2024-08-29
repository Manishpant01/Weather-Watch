import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { geocoordinateResult } from "../../services";
import LocationList from "../showLocationList";

const mockLocations: geocoordinateResult[] = [
  { id: 1, name: "New York", country: "USA" },
  { id: 2, name: "London", country: "UK" },
];

const mockUpdateLocation = jest.fn();

describe("LocationList Component", () => {
  it("renders the list of locations correctly", () => {
    const { getByText } = render(
      <LocationList
        location={mockLocations}
        updateLocation={mockUpdateLocation}
      />
    );

    expect(getByText("New York, USA")).toBeTruthy();
    expect(getByText("London, UK")).toBeTruthy();
  });

  it("calls updateLocation with the correct item when a location is pressed", () => {
    const { getByText } = render(
      <LocationList
        location={mockLocations}
        updateLocation={mockUpdateLocation}
      />
    );

    fireEvent.press(getByText("New York, USA"));

    expect(mockUpdateLocation).toHaveBeenCalledWith([
      { id: 1, name: "New York", country: "USA", selected: true },
    ]);
  });

  it("renders the empty state when there are no locations", () => {
    const { getByText } = render(
      <LocationList location={[]} updateLocation={mockUpdateLocation} />
    );
    expect(getByText("No data found.")).toBeTruthy();
  });
});
