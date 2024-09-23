import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Show from "@/data/utilities/show/util";

describe("Show Component", () => {
  it("should render the correct child based on Show.When condition", () => {
    render(
      <Show>
        <Show.When isTrue={false}>Should not be shown</Show.When>
        <Show.When isTrue={true}>Should be shown</Show.When>
        <Show.Else>Fallback content</Show.Else>
      </Show>
    );

    expect(screen.getByText("Should be shown")).toBeInTheDocument();
    expect(screen.queryByText("Should not be shown")).toBeNull();
    expect(screen.queryByText("Fallback content")).toBeNull();
  });

  it("should render fallback content when no Show.When child is true", () => {
    render(
      <Show>
        <Show.When isTrue={false}>Should not be shown</Show.When>
        <Show.Else>Fallback content</Show.Else>
      </Show>
    );

    expect(screen.queryByText("Should not be shown")).toBeNull();
    expect(screen.getByText("Fallback content")).toBeInTheDocument();
  });

  it("should render Show.Else content when no Show.When child is provided", () => {
    render(
      <Show>
        <Show.Else>Fallback content</Show.Else>
      </Show>
    );

    expect(screen.getByText("Fallback content")).toBeInTheDocument();
  });

  it("should render the first valid Show.When if multiple are true", () => {
    render(
      <Show>
        <Show.When isTrue={true}>First true</Show.When>
        <Show.When isTrue={true}>Second true</Show.When>
        <Show.Else>Fallback content</Show.Else>
      </Show>
    );

    expect(screen.getByText("First true")).toBeInTheDocument();
    expect(screen.queryByText("Second true")).toBeNull();
    expect(screen.queryByText("Fallback content")).toBeNull();
  });
});
