import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import { useChatGPT } from "@/public/data/hooks/usechatgpt/hook"; // Adjust the import path as needed

global.fetch = vi.fn();

describe("useChatGPT", () => {
  const apiKey: string = String(process.env.OPENAI_API);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should handle successful API response", async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: "Hello from ChatGPT!",
          },
        },
      ],
    };

    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => useChatGPT(apiKey));

    await act(async () => {
      await result.current.sendMessage("Hello");
    });

    expect(result.current.response).toBe("Hello from ChatGPT!");
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle API errors", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    const { result } = renderHook(() => useChatGPT(apiKey));

    await act(async () => {
      await result.current.sendMessage("Hello");
    });

    expect(result.current.response).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe("Error: 500 Internal Server Error");
  });

  it("should handle network errors", async () => {
    (fetch as Mock).mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => useChatGPT(apiKey));

    await act(async () => {
      await result.current.sendMessage("Hello");
    });

    expect(result.current.response).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe("Network Error");
  });
});
