import { renderHook, act } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { useScrollIntoView } from "@/public/data/hooks/usescrollintoview/hook";

describe("useScrollIntoView", () => {
  it("should call scrollIntoView with default options", () => {
    // Create a mock element with a scrollIntoView method
    const mockElement = {
      scrollIntoView: vi.fn(),
    };

    // Create a mock ref object with current pointing to the mock element
    const ref = {
      current: mockElement,
    } as unknown as React.RefObject<HTMLElement>;

    // Render the hook
    const { result } = renderHook(() => useScrollIntoView(ref));

    // Call the hook's returned callback to trigger scrollIntoView
    act(() => {
      result.current();
    });

    // Verify that scrollIntoView was called with the default options
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  });

  it("should call scrollIntoView with custom options", () => {
    // Create a mock element with a scrollIntoView method
    const mockElement = {
      scrollIntoView: vi.fn(),
    };

    // Create a mock ref object with current pointing to the mock element
    const ref = {
      current: mockElement,
    } as unknown as React.RefObject<HTMLElement>;

    // Render the hook with custom options
    const { result } = renderHook(() =>
      useScrollIntoView(ref, "auto", "center", "end")
    );

    // Call the hook's returned callback to trigger scrollIntoView
    act(() => {
      result.current();
    });

    // Verify that scrollIntoView was called with the custom options
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: "auto",
      block: "center",
      inline: "end",
    });
  });

  it("should not call scrollIntoView if ref is null", () => {
    // Create a mock ref object with current as null
    const ref = { current: null } as React.RefObject<HTMLElement>;

    // Render the hook
    const { result } = renderHook(() => useScrollIntoView(ref));

    // Call the hook's returned callback
    act(() => {
      result.current();
    });

    // No error should occur, and scrollIntoView should not be called
    expect(() => result.current()).not.toThrow();
  });
});
