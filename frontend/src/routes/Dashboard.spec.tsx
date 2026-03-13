import { render, screen } from "@testing-library/react";

import { Dashboard } from "./Dashboard";

describe("Dashboard", () => {
  it("should be defined", async () => {
    render(<Dashboard />);
    expect(screen.getByText("Todo!")).toBeDefined();
  });
});
