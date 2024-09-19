import { useState, useMemo, useCallback } from "react";

interface UseSortReturn<T> {
  sortedItems: T[];
  order: "asc" | "desc";
  toggleOrder: () => void;
}

export function useSort<T>(
  items: T[],
  sortFn: (a: T, b: T) => number,
  initialOrder: "asc" | "desc" = "asc"
): UseSortReturn<T> {
  const [order, setOrder] = useState<"asc" | "desc">(initialOrder);

  const sortedItems = useMemo(() => {
    const sorted = [...items].sort(sortFn);
    return order === "asc" ? sorted : sorted.reverse();
  }, [items, sortFn, order]);

  const toggleOrder = useCallback(() => {
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  }, []);

  return { sortedItems, order, toggleOrder };
}
