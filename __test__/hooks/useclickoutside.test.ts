import { renderHook } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { useRef } from "react";
import useClickOutside from "@/data/hooks/useclickoutside/hook";
import { describe, it, expect, vi } from "vitest";

describe("useClickOutside", () => {
  it("should trigger callback when clicked outside the element", () => {
    const callback = vi.fn();

    const { result } = renderHook(() => {
      const ref = useRef<HTMLElement>(null);
      useClickOutside(ref, callback);
      return ref;
    });

    const element = document.createElement("div");
    document.body.appendChild(element);

    Object.defineProperty(result.current, "current", {
      value: element,
    });

    fireEvent.mouseDown(document.body);

    expect(callback).toHaveBeenCalled();

    document.body.removeChild(element);
  });

  it("should not trigger callback when clicked inside the element", () => {
    const callback = vi.fn();

    const { result } = renderHook(() => {
      const ref = useRef<HTMLElement>(null);
      useClickOutside(ref, callback);
      return ref;
    });

    const element = document.createElement("div");
    document.body.appendChild(element);

    Object.defineProperty(result.current, "current", {
      value: element,
    });

    fireEvent.mouseDown(element);

    expect(callback).not.toHaveBeenCalled();

    document.body.removeChild(element);
  });
});
