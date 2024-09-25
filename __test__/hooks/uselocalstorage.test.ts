import { renderHook, act } from "@testing-library/react";
import { expect } from "vitest";
import { useLocalStorage } from "@/public/data/hooks/uselocalstorage/hook";

describe("useLocalStorage", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
  });

  it("should initialize with default value if localStorage is empty", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"));

    expect(result.current[0]).toBe("default");
  });

  it("should initialize with value from localStorage if available", () => {
    // Set a value in localStorage directly
    window.localStorage.setItem("key", JSON.stringify("stored value"));

    const { result } = renderHook(() => useLocalStorage("key", "default"));

    expect(result.current[0]).toBe("stored value");
  });

  it("should update localStorage when the state changes", () => {
    const { result } = renderHook(() => useLocalStorage("key", "initial"));

    const [, setValue] = result.current;

    act(() => {
      setValue("updated");
    });

    expect(window.localStorage.getItem("key")).toBe(JSON.stringify("updated"));
    expect(result.current[0]).toBe("updated");
  });
});
