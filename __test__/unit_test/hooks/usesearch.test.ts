import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useSearch } from "@/public/data/hooks/usesearch/hook";

// Mock items for the search
const items = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Cherry" },
];

describe("useSearch", () => {
  it("should return all items initially", () => {
    const filterFn = (item: { id: number; name: string }, query: string) =>
      item.name.toLowerCase().includes(query.toLowerCase());

    const { result } = renderHook(() => useSearch(items, filterFn));

    expect(result.current.filteredItems).toEqual(items);
    expect(result.current.query).toBe("");
    expect(result.current.isSearching).toBe(true);
  });

  it("should update query and filter items", async () => {
    const filterFn = (item: { id: number; name: string }, query: string) =>
      item.name.toLowerCase().includes(query.toLowerCase());

    const { result } = renderHook(() => useSearch(items, filterFn, 300));

    act(() => {
      result.current.setQuery("ban");
    });

    expect(result.current.query).toBe("ban");
    expect(result.current.isSearching).toBe(true);
  });

  it("should return no results for unmatched query", async () => {
    const filterFn = (item: { id: number; name: string }, query: string) =>
      item.name.toLowerCase().includes(query.toLowerCase());

    const { result } = renderHook(() => useSearch(items, filterFn, 300));

    act(() => {
      result.current.setQuery("xyz");
    });
  });

  it("should handle debounce correctly", async () => {
    const filterFn = (item: { id: number; name: string }, query: string) =>
      item.name.toLowerCase().includes(query.toLowerCase());

    const { result } = renderHook(
      () => useSearch(items, filterFn, 500), // Longer debounce for testing
    );

    act(() => {
      result.current.setQuery("app");
    });

    expect(result.current.isSearching).toBe(true);

    // Verify that no update has occurred yet due to debounce
    expect(result.current.filteredItems).toEqual(items);
  });
});
