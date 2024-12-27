import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Delay from "@/public/data/utilities/delay/util";

describe("Delay Component", () => {
  it("should render children after the specified delay", async () => {
    render(
      <Delay ms={500}>
        <div>Delayed Content</div>
      </Delay>
    );

    expect(screen.queryByText("Delayed Content")).toBeNull();

    await new Promise((r) => setTimeout(r, 500));

    expect(screen.getByText("Delayed Content")).toBeInTheDocument();
  });

  it("should not render children before the specified delay", () => {
    render(
      <Delay ms={500}>
        <div>Delayed Content</div>
      </Delay>
    );

    expect(screen.queryByText("Delayed Content")).toBeNull();
  });
});
