"use client";

import { useEffect, useState } from "react";
import { Layout } from "@/components/layouts/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Code from "@/components/code/code";
import { Each } from "@/components/utilities/each/each";

interface Trigger {
  value: string;
  title: string;
}

interface Content {
  value: string;
  code: string;
  ariaLabel?: string;
}

interface codeBlockProps {
  defaultValue: string;
  triggers: Trigger[];
  contents: Content[];
}

/**
 * CodeBlock component renders a tabbed interface where each tab displays a code block.
 * It supports multiple tabs and scrollable areas for long content.
 *
 * Props:
 * - defaultValue (string): The initial value to set for the active tab.
 * - triggers (array(object)):
 *  - value (string): The value of trigger.
 *  - title (string): The trigger title.
 * -contents (array(object)):
 *  - value (string): The value of content.
 *  - code (string): The code for content.
 *  - ariaLabel (string | optional): The aria-label element for content.
 *
 * @param {codeBlockProps} props - Contains the default value, triggers, and contents.
 * @returns {JSX.Element} The rendered CodeBlock component.
 */
export default function CodeBlock({
  defaultValue,
  triggers,
  contents,
}: codeBlockProps): JSX.Element {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  const getScrollAreaWidth = (width: number) => {
    if (width < 768) {
      return `${width - 50}px`;
    } else if (width < 1024) {
      return `${width - 240}px`;
    } else if (width < 1200) {
      return "80%";
    } else {
      return "100%";
    }
  };

  return (
    <Layout type="section" id="code" className="overflow-hidden">
      <Layout type="article">
        <Tabs defaultValue={defaultValue}>
          <TabsList aria-label="Code and Usage tabs">
            <Each
              of={triggers}
              render={(
                item: { value: string; title: string },
                index: number
              ) => (
                <TabsTrigger value={item.value} key={index}>
                  {item.title}
                </TabsTrigger>
              )}
            />
          </TabsList>
          <Each
            of={contents}
            render={(
              item: {
                value: string;
                ariaLabel?: string | undefined;
                code: string;
              },
              index: number
            ) => (
              <TabsContent value={item.value} key={index}>
                <ScrollArea
                  className="h-96 whitespace-nowrap rounded-xl"
                  style={{
                    width: getScrollAreaWidth(windowWidth),
                  }}
                  aria-label={item.ariaLabel}
                >
                  <Code code={item.code} />
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </TabsContent>
            )}
          />
        </Tabs>
      </Layout>
    </Layout>
  );
}
