import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useSort } from "@/public/data/hooks/usesort/hook";

// Test data
const items = [
  { id: 1, name: "Banana" },
  { id: 2, name: "Apple" },
  { id: 3, name: "Cherry" },
];

// Custom sorting function
const sortFn = (
  a: { id: number; name: string },
  b: { id: number; name: string }
) => a.name.localeCompare(b.name);

describe("useSort", () => {
  it("should sort items in ascending order by default", () => {
    const { result } = renderHook(() => useSort(items, sortFn, "asc"));

    expect(result.current.sortedItems).toEqual([
      { id: 2, name: "Apple" },
      { id: 1, name: "Banana" },
      { id: 3, name: "Cherry" },
    ]);
    expect(result.current.order).toBe("asc");
  });

  it("should sort items in descending order initially", () => {
    const { result } = renderHook(() => useSort(items, sortFn, "desc"));

    expect(result.current.sortedItems).toEqual([
      { id: 3, name: "Cherry" },
      { id: 1, name: "Banana" },
      { id: 2, name: "Apple" },
    ]);
    expect(result.current.order).toBe("desc");
  });

  it("should toggle sorting order from ascending to descending", () => {
    const { result } = renderHook(() => useSort(items, sortFn, "asc"));

    act(() => {
      result.current.toggleOrder();
    });

    expect(result.current.sortedItems).toEqual([
      { id: 3, name: "Cherry" },
      { id: 1, name: "Banana" },
      { id: 2, name: "Apple" },
    ]);
    expect(result.current.order).toBe("desc");
  });

  it("should toggle sorting order from descending to ascending", () => {
    const { result } = renderHook(() => useSort(items, sortFn, "desc"));

    act(() => {
      result.current.toggleOrder();
    });

    expect(result.current.sortedItems).toEqual([
      { id: 2, name: "Apple" },
      { id: 1, name: "Banana" },
      { id: 3, name: "Cherry" },
    ]);
    expect(result.current.order).toBe("asc");
  });

  it("should handle empty items array", () => {
    const { result } = renderHook(() => useSort([], sortFn, "asc"));

    expect(result.current.sortedItems).toEqual([]);
    expect(result.current.order).toBe("asc");
  });
});
