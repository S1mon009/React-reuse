import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useCounter } from "@/data/hooks/usecounter/hook";

describe("useCounter", () => {
  it("should initialize with default value 0", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0); // Default initial value is 0
  });

  it("should initialize with provided initial value", () => {
    const { result } = renderHook(() => useCounter(5));

    expect(result.current.count).toBe(5); // Initial value is 5
  });

  it("should increment the count", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1); // After increment, count is 1
  });

  it("should decrement the count", () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4); // After decrement, count is 4
  });

  it("should reset the count to initial value", () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => {
      result.current.increment(); // Now count is 11
      result.current.reset(); // Should reset back to 10
    });

    expect(result.current.count).toBe(10); // After reset, count is back to initial value (10)
  });

  it("should set the count to a specific value", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.set(100); // Set the count to 100
    });

    expect(result.current.count).toBe(100); // After setting, count is 100
  });
});
