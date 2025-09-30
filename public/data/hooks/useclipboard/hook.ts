import { useState, useCallback } from "react";

interface UseClipboardReturn {
  copyToClipboard: (text: string) => void;
  isCopied: boolean;
  error: string | null;
  reset: () => void;
}

export function useClipboard(): UseClipboardReturn {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to copy text to clipboard
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      // Use Clipboard API to copy the provided text
      await navigator.clipboard.writeText(text);
      setIsCopied(true); // Set the copied state to true on success
      setError(null); // Clear any previous error
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setError("Failed to copy text to clipboard");
      setIsCopied(false); // Reset the copied state on failure
    }
  }, []);

  // Function to reset the copied state and error
  const reset = useCallback(() => {
    setIsCopied(false);
    setError(null);
  }, []);

  return { copyToClipboard, isCopied, error, reset };
}
