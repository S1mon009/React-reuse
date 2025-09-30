import { useState, useCallback, useRef, useEffect } from "react";

interface UseHoverReturn<T extends HTMLElement> {
  hovered: boolean;
  ref: React.RefObject<T | null>;
}

export function useHover<T extends HTMLElement>(): UseHoverReturn<T> {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<T>(null);

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  useEffect(() => {
    const node = ref.current;

    if (node) {
      node.addEventListener("mouseenter", handleMouseEnter);
      node.addEventListener("mouseleave", handleMouseLeave);
    }

    // Cleanup function to remove event listeners
    return () => {
      if (node) {
        node.removeEventListener("mouseenter", handleMouseEnter);
        node.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [handleMouseEnter, handleMouseLeave]);

  return { hovered, ref };
}
