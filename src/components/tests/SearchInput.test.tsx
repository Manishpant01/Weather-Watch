import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import SearchInput from "../SearchInput";
import { DEFAULT_LOCATION } from "../../helpers";

const mockGetCoordinate = jest.fn();

describe("SearchInput Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    mockGetCoordinate.mockClear();
  });

  it("renders the SearchInput component correctly", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <SearchInput getCoordinate={mockGetCoordinate} />
    );

    expect(getByPlaceholderText("Search by cities")).toBeTruthy();
    expect(getByTestId("search-icon")).toBeTruthy();
  });

  it("updates state and calls getCoordinate with debounce", () => {
    const { getByPlaceholderText } = render(
      <SearchInput getCoordinate={mockGetCoordinate} />
    );

    const input = getByPlaceholderText("Search by cities");
    fireEvent.changeText(input, "New York");

    act(() => {
      jest.advanceTimersByTime(650);
    });

    expect(mockGetCoordinate).toHaveBeenCalledWith("New York");
  });

  it("uses default location when input is cleared", () => {
    const { getByPlaceholderText } = render(
      <SearchInput getCoordinate={mockGetCoordinate} />
    );

    const input = getByPlaceholderText("Search by cities");
    fireEvent.changeText(input, "");

    act(() => {
      jest.advanceTimersByTime(650);
    });

    expect(mockGetCoordinate).toHaveBeenCalledWith(DEFAULT_LOCATION);
  });
});
