"use client";

import { useState, useEffect, type JSX } from "react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CodeBlock } from "react-code-block";
import Show from "@/components/utilities/show/show";
import Typography from "@/components/typography/typography";
import Layout from "@/components/layouts/layout";
import { Copy, Check, Loader2 } from "lucide-react";

import axios from "axios";
import { CodeProps } from "./interface";

export async function getCodeContent(code: string) {
  try {
    const response = await axios.get(`/api/read-file`, {
      params: { filePath: code },
    });

    return response.data.content;
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong");
  }
}

/**
 * Code component that displays formatted and highlighted code using the react-code-block library.
 *
 * Props:
 * - code (string): The code content to display.
 * - language (string | optional): The language for syntax highlighting (defaults to "tsx").
 *
 * @param {CodeProps} props - Contains code content and optional language parameter
 * @returns {JSX.Element} The rendered Code component.
 */
export default function Code({
  code,
  language = "tsx",
}: CodeProps): JSX.Element {
  const [copied, setCopied] = useState<boolean>(false);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fileContent", code],
    queryFn: getCodeContent.bind(null, code),
  });

  if (error) {
    console.error(error);
  }

  const copyCode = () => {
    setCopied(true);
    if (data) {
      navigator.clipboard.writeText(data.content);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [copied]);

  return (
    <ScrollArea className="h-96 whitespace-nowrap rounded-xl w-full">
      <CodeBlock code={data || ""} language={language}>
        <CodeBlock.Code className="bg-gray-900 p-6 rounded-xl h-auto">
          <Show>
            <Show.When isTrue={isLoading}>
              <Layout type="div" className="flex items-center space-x-3">
                <Loader2 className="animate-spin" />
                <Typography type="p" className="-translate-y-3">
                  Loading...
                </Typography>
              </Layout>
            </Show.When>
            <Show.When isTrue={isError}>Error loading content.</Show.When>
            <Show.Else>
              <div className="table-row">
                <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
                <CodeBlock.LineContent className="table-cell">
                  <CodeBlock.Token />
                </CodeBlock.LineContent>
              </div>
            </Show.Else>
          </Show>
          <Show>
            <Show.When isTrue={!!data}>
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-2 right-4"
                onClick={copyCode}
                aria-label="Copy to clipboard"
              >
                {copied ? <Check /> : <Copy />}
              </Button>
            </Show.When>
          </Show>
        </CodeBlock.Code>
      </CodeBlock>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
