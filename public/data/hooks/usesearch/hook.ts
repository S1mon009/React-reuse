import { useState, useEffect } from "react";

interface UseSearchReturn<T> {
  query: string;
  setQuery: (query: string) => void;
  filteredItems: T[];
  isSearching: boolean;
}

export function useSearch<T>(
  items: T[],
  filterFn: (item: T, query: string) => boolean,
  debounceDelay = 300
): UseSearchReturn<T> {
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<T[]>(items);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      const filtered = items.filter((item) => filterFn(item, query));
      setFilteredItems(filtered);
      setIsSearching(false);
    }, debounceDelay);

    setIsSearching(true);

    return () => {
      clearTimeout(handler);
    };
  }, [query, items, filterFn, debounceDelay]);

  return {
    query,
    setQuery,
    filteredItems,
    isSearching,
  };
}
