import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom"; // Dodaj ten import
import { useClipboard } from "@/public/data/hooks/useclipboard/hook";

const mockWriteText = vi.fn();

beforeEach(() => {
  mockWriteText.mockReset();
  Object.assign(navigator, {
    clipboard: {
      writeText: mockWriteText,
    },
  });
});

describe("useClipboard", () => {
  it("should copy text to the clipboard successfully", async () => {
    mockWriteText.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      result.current.copyToClipboard("Hello, World!");
    });

    expect(result.current.isCopied).toBe(true);
    expect(result.current.error).toBeNull();
    expect(mockWriteText).toHaveBeenCalledWith("Hello, World!");
  });

  it("should set error state when clipboard copy fails", async () => {
    mockWriteText.mockRejectedValueOnce(new Error("Copy failed"));

    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      result.current.copyToClipboard("Hello, World!");
    });

    expect(result.current.isCopied).toBe(false);
    expect(result.current.error).toBe("Failed to copy text to clipboard");
    expect(mockWriteText).toHaveBeenCalledWith("Hello, World!");
  });

  it("should reset isCopied and error state", () => {
    const { result } = renderHook(() => useClipboard());

    act(() => {
      result.current.reset();
    });

    expect(result.current.isCopied).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
