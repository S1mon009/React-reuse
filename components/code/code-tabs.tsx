import type { JSX } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Each from "@/components/utilities/each/each";
import { CodeContent, CodeHeading } from "@/components/code";
import Layout from "@/components/layouts/layout";

import { CodeTabsProps } from "./interface";

export default function CodeTabs({
  defaultValue,
  triggers,
  contents,
}: CodeTabsProps): JSX.Element {
  return (
    <>
      <CodeHeading />
      <Layout type="section" id="code" className="overflow-hidden my-3">
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
                <CodeContent code={item.code} />
              </TabsContent>
            )}
          />
        </Tabs>
      </Layout>
    </>
  );
}
