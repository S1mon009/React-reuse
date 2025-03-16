import type { JSX } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Each from "@/components/utilities/each/each";
import Code from "@/components/code/code";
import Layout from "@/components/layouts/layout";

import { CodeBlockProps } from "./interface";

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
 * @param {CodeBlockProps} props - Contains the default value, triggers, and contents.
 * @returns {JSX.Element} The rendered CodeBlock component.
 */
export default function CodeBlock({
  defaultValue,
  triggers,
  contents,
}: CodeBlockProps): JSX.Element {
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
                <Code code={item.code} />
              </TabsContent>
            )}
          />
        </Tabs>
      </Layout>
    </Layout>
  );
}
