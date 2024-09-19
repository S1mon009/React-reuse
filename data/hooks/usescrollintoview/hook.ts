import { useCallback } from "react";

export const useScrollIntoView = (
  ref: React.RefObject<HTMLElement>,
  behavior?: "auto" | "smooth",
  block?: "start" | "center" | "end" | "nearest",
  inline?: "start" | "center" | "end" | "nearest"
) => {
  return useCallback(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: behavior || "smooth",
        block: block || "start",
        inline: inline || "nearest",
      });
    }
  }, [ref]);
};

export default useScrollIntoView;
