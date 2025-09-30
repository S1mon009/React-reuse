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

import { CodeContentProps } from "./interface";

const fetchContent = async (code: string) => {
  const res = await fetch(`/api/get-file?filePath=${code}`);
  const { content } = await res.json();
  return content;
};

export default function CodeContent({
  code,
  language = "tsx",
}: CodeContentProps): JSX.Element {
  const [copied, setCopied] = useState<boolean>(false);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fileContent", code],
    queryFn: () => {
      return fetchContent(code);
    },
  });

  if (error) {
    console.error(error);
  }

  const copyCode = () => {
    setCopied(true);
    if (data) {
      navigator.clipboard.writeText(data);
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
        <CodeBlock.Code className="bg-gray-900 p-6 my-0 rounded-xl">
          <Show>
            <Show.When isTrue={isLoading}>
              <Layout type="div" className="flex items-center space-x-3">
                <Loader2 className="animate-spin" />
                <Typography
                  type="p"
                  className="-translate-y-1 after:content-['.'] after:animate-ellipsis after:inline-block after:w-4"
                >
                  Loading
                </Typography>
              </Layout>
            </Show.When>
            <Show.When isTrue={isError}>Error loading content.</Show.When>
            <Show.Else>
              <div className="table-row mt-3">
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
                className="absolute top-4 right-4"
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
