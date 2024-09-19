import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useDebounce } from "@/data/hooks/usedebounce/hook";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers(); // Use fake timers for controlling time
  });

  afterEach(() => {
    vi.clearAllTimers(); // Clear timers after each test
    vi.useRealTimers(); // Restore real timers
  });

  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("test", 500));

    // Immediately after render, the debounced value should be the same as the initial value
    expect(result.current).toBe("test");
  });

  it("should debounce the value after the specified delay", async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: "initial" },
      }
    );

    // Initially, debounced value should be the initial value
    expect(result.current).toBe("initial");

    // Change value and rerender
    rerender({ value: "changed" });

    // Value should not change immediately
    expect(result.current).toBe("initial");

    // Advance time by 500ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Now the debounced value should be updated
    expect(result.current).toBe("changed");
  });

  it("should reset the debounce timer on each value change", async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: "first" },
      }
    );

    // Initially, debounced value should be 'first'
    expect(result.current).toBe("first");

    // Change value to 'second'
    rerender({ value: "second" });

    // Time has not passed yet, so the value should remain 'first'
    expect(result.current).toBe("first");

    // Change value again to 'third' before 500ms has passed
    rerender({ value: "third" });

    // Still no change since debounce timer has been reset
    expect(result.current).toBe("first");

    // Now let 500ms pass
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // After the delay, the debounced value should be 'third'
    expect(result.current).toBe("third");
  });
});
