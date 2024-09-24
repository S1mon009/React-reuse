import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Each } from "@/app/data/utilities/each/util";

describe("Each Component", () => {
  it("should render each item using the provided render function", () => {
    const mockRender = vi.fn((item, index) => <div key={index}>{item}</div>);
    const items = ["Item 1", "Item 2", "Item 3"];

    render(<Each render={mockRender} of={items} />);

    expect(mockRender).toHaveBeenCalledTimes(items.length);
    items.forEach((item, index) => {
      expect(mockRender).toHaveBeenCalledWith(item, index);
    });

    items.forEach((item, index) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("should handle an empty array", () => {
    const mockRender = vi.fn();
    const items: any[] = [];

    render(<Each render={mockRender} of={items} />);

    expect(mockRender).not.toHaveBeenCalled();
    expect(screen.queryByText("Item 1")).toBeNull();
  });

  it("should render items with different types", () => {
    const mockRender = vi.fn((item, index) => (
      <div key={index}>{item.toString()}</div>
    ));
    const items = [1, true, { foo: "bar" }];

    render(<Each render={mockRender} of={items} />);

    expect(mockRender).toHaveBeenCalledTimes(items.length);
    items.forEach((item, index) => {
      expect(mockRender).toHaveBeenCalledWith(item, index);
      expect(screen.getByText(item.toString())).toBeInTheDocument();
    });
  });
});
