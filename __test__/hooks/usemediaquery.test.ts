import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { useMediaQuery } from "@/data/hooks/usemediaquery/hook";

describe("useMediaQuery", () => {
  beforeEach(() => {
    // Mock implementation of window.matchMedia
    vi.spyOn(window, "matchMedia").mockImplementation((query: string) => {
      let matches = query === "(max-width: 600px)";
      const listeners: EventListener[] = [];

      const mediaQueryList: MediaQueryList = {
        media: query,
        matches,
        onchange: null,
        addEventListener: (type: string, listener: EventListener) => {
          if (type === "change") {
            listeners.push(listener);
          }
        },
        removeEventListener: (type: string, listener: EventListener) => {
          if (type === "change") {
            const index = listeners.indexOf(listener);
            if (index !== -1) {
              listeners.splice(index, 1);
            }
          }
        },
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        dispatchEvent: vi.fn(),
      };

      // Simulate a media query change after a short delay
      setTimeout(() => {
        matches = !matches;
        listeners.forEach((listener) =>
          listener({ matches } as unknown as Event)
        );
      }, 100);

      return mediaQueryList;
    });
  });

  it("should return true when media query matches", () => {
    const { result } = renderHook(() => useMediaQuery("(max-width: 600px)"));

    expect(result.current).toBe(true);
  });

  it("should return false when media query does not match", () => {
    vi.spyOn(window, "matchMedia").mockImplementation((query: string) => {
      const mediaQueryList: MediaQueryList = {
        media: query,
        matches: query === "(min-width: 601px)",
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        dispatchEvent: vi.fn(),
      };
      return mediaQueryList;
    });

    const { result } = renderHook(() => useMediaQuery("(max-width: 600px)"));

    expect(result.current).toBe(false);
  });

  it("should update state when media query changes", async () => {
    const matchMediaSpy = vi
      .spyOn(window, "matchMedia")
      .mockImplementation((query: string) => {
        let matches = query === "(max-width: 600px)";
        const listeners: EventListener[] = [];

        const mediaQueryList: MediaQueryList = {
          media: query,
          matches,
          onchange: null,
          addEventListener: (type: string, listener: EventListener) => {
            if (type === "change") {
              listeners.push(listener);
            }
          },
          removeEventListener: (type: string, listener: EventListener) => {
            if (type === "change") {
              const index = listeners.indexOf(listener);
              if (index !== -1) {
                listeners.splice(index, 1);
              }
            }
          },
          addListener: vi.fn(), // Deprecated
          removeListener: vi.fn(), // Deprecated
          dispatchEvent: vi.fn(),
        };

        // Simulate a media query change after a short delay
        setTimeout(() => {
          matches = !matches;
          listeners.forEach((listener) =>
            listener({ matches } as unknown as Event)
          );
        }, 100);

        return mediaQueryList;
      });

    const { result } = renderHook(() => useMediaQuery("(max-width: 600px)"));

    expect(result.current).toBe(true);
  });

  it("should clean up event listeners on unmount", () => {
    const removeEventListenerSpy = vi.fn();
    vi.spyOn(window, "matchMedia").mockImplementation((query: string) => {
      return {
        media: query,
        matches: query === "(max-width: 600px)",
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: removeEventListenerSpy,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        dispatchEvent: vi.fn(),
      } as MediaQueryList;
    });

    const { unmount } = renderHook(() => useMediaQuery("(max-width: 600px)"));

    // Unmount the hook
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalled();
  });
});
