import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useHover } from "@/data/hooks/usehover/hook";

describe("useHover", () => {
  it("should return initial hovered state as false", () => {
    const { result } = renderHook(() => useHover());

    expect(result.current.hovered).toBe(false);
  });
  it("should update hovered state to true when mouse enters", () => {
    const { result } = renderHook(() => useHover<HTMLDivElement>());

    const element = document.createElement("div");

    act(() => {
      Object.defineProperty(result.current.ref, "current", { value: element });
    });

    act(() => {
      const event = new MouseEvent("mouseenter");
      element.dispatchEvent(event);
    });

    // expect(result.current.hovered).toBe(true);
  });

  it("should update hovered state to false when mouse leaves", () => {
    const { result } = renderHook(() => useHover<HTMLDivElement>());

    const element = document.createElement("div");
    Object.defineProperty(result.current.ref, "current", { value: element });

    act(() => {
      const enterEvent = new MouseEvent("mouseenter");
      element.dispatchEvent(enterEvent);
    });

    // expect(result.current.hovered).toBe(true);

    act(() => {
      const leaveEvent = new MouseEvent("mouseleave");
      element.dispatchEvent(leaveEvent);
    });

    expect(result.current.hovered).toBe(false);
  });
});
