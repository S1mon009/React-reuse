import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { If } from "@/public/data/utilities/if/util";

describe("If Component", () => {
  it("should render children when condition is true", () => {
    render(
      <If condition={true}>
        <p>Condition is true</p>
      </If>,
    );

    expect(screen.getByText("Condition is true")).toBeInTheDocument();
  });

  it("should not render children when condition is false", () => {
    render(
      <If condition={false}>
        <p>Condition is false</p>
      </If>,
    );

    expect(screen.queryByText("Condition is false")).toBeNull();
  });

  it("should render else content when condition is false", () => {
    render(
      <If condition={false} else={<p>Fallback content</p>}>
        <p>Main content</p>
      </If>,
    );

    expect(screen.getByText("Fallback content")).toBeInTheDocument();
    expect(screen.queryByText("Main content")).toBeNull();
  });

  it("should not render else content when condition is true", () => {
    render(
      <If condition={true} else={<p>Fallback content</p>}>
        <p>Main content</p>
      </If>,
    );

    expect(screen.getByText("Main content")).toBeInTheDocument();
    expect(screen.queryByText("Fallback content")).toBeNull();
  });
});
