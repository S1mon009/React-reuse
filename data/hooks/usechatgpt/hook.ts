import { useState } from "react";

interface ChatGPTResponse {
  sendMessage: (message: string) => Promise<void>;
  response: string | null;
  isLoading: boolean;
  error: string | null;
}

export function useChatGPT(apiKey: string): ChatGPTResponse {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Default model to be used
  const defaultModel = "gpt-3.5-turbo";

  const sendMessage = async (message: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: defaultModel,
          messages: [{ role: "user", content: message }],
        }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      const botResponse = data.choices[0].message.content;
      setResponse(botResponse);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, response, isLoading, error };
}

export default useChatGPT;
