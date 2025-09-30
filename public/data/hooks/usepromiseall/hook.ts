import { useEffect, useState } from "react";

interface UsePromiseAllResult<T> {
  results: T[] | null;
  error: Error | null;
  isLoading: boolean;
}

export function usePromiseAll<T>(
  promises: Promise<T>[],
): UsePromiseAllResult<T> {
  const [results, setResults] = useState<T[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Reset state whenever promises change
    setIsLoading(true);
    setResults(null);
    setError(null);

    Promise.all(promises)
      .then((resolvedValues) => {
        setResults(resolvedValues);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [promises]);

  return { results, error, isLoading };
}
