import { renderHook, act } from "@testing-library/react";
import { expect } from "vitest";
import { useInterval } from "@/data/hooks/useinterval/hook";
import { vi } from "vitest";

describe("useInterval", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("should call the callback at the specified interval", () => {
    const callback = vi.fn();

    // Render the hook with a 1000ms interval
    renderHook(() => useInterval(callback, 1000));

    // Fast-forward time by 3 seconds
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // The callback should have been called 3 times in 3 seconds
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it("should not call the callback if the delay is null", () => {
    const callback = vi.fn();

    // Render the hook with a null delay (stopped interval)
    renderHook(() => useInterval(callback, null));

    // Fast-forward time by 3 seconds
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // The callback should not have been called
    expect(callback).not.toHaveBeenCalled();
  });

  it("should restart the interval when the delay changes", () => {
    const callback = vi.fn();

    const { rerender } = renderHook(
      ({ delay }) => useInterval(callback, delay),
      {
        initialProps: { delay: 1000 },
      }
    );

    // Fast-forward time by 2 seconds
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // The callback should have been called 2 times
    expect(callback).toHaveBeenCalledTimes(2);

    // Change the delay to 500ms and rerender the hook
    rerender({ delay: 500 });

    // Fast-forward time by 1 second (2 more intervals should happen)
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // The callback should now have been called 4 more times
    expect(callback).toHaveBeenCalledTimes(4);
  });

  it("should clear the interval on unmount", () => {
    const callback = vi.fn();

    const { unmount } = renderHook(() => useInterval(callback, 1000));

    // Fast-forward time by 2 seconds
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // The callback should have been called 2 times
    expect(callback).toHaveBeenCalledTimes(2);

    // Unmount the hook
    unmount();

    // Fast-forward time by 2 more seconds (interval should be cleared)
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // The callback should still have only been called 2 times
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
