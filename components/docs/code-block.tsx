import { Layout } from "@/components/layouts/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  return (
    <Layout type="section" id="code">
      <Layout type="article">
        <Tabs defaultValue={defaultValue}>
          <TabsList aria-label="Code and Usage tabs">
            <Each
              of={triggers}
              render={(item, index: number) => (
                <TabsTrigger value={item.value} key={index}>
                  {item.title}
                </TabsTrigger>
              )}
            />
          </TabsList>
          <Each
            of={contents}
            render={(item, index: number) => (
              <TabsContent value={item.value} key={index}>
                <ScrollArea className="h-96" aria-label={item.ariaLabel}>
                  <Code code={item.code} />
                </ScrollArea>
              </TabsContent>
            )}
          />
        </Tabs>
      </Layout>
    </Layout>
  );
}
