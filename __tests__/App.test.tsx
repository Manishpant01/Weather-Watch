// __tests__/App.test.tsx

import React from "react";
import { render } from "@testing-library/react-native";
import App from "../App";

describe("App Component", () => {
  it("renders the Main component", () => {
    const { getByTestId } = render(<App />);

    const mainComponent = getByTestId("main-component");
    expect(mainComponent).toBeTruthy();
  });
});
