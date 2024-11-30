import { Layout } from "@/components/layouts/layout";
import { Typography } from "@/components/typography/typography";
import Show from "@/components/utilities/conditional_rendering/show";
import { Each } from "@/components/utilities/each/each";
import { splitTextByLastChar } from "@/lib/utils";

interface listProps {
  id: string;
  name: string;
  content?: string;
  ariaLabel?: string;
  contentList: string;
}

/**
 * List component that renders a section with a title, optional content, and a list of items.
 * Each list item is split by a colon (':') into two parts: the label and its description.
 *
 * Props:
 * - id (string): List id.
 * - name (string): List name.
 * - content (string | optional): The content for list.
 * - ariaLabel (string | optional): The aria-label element for list content.
 * - contentList (string): The content internalization key.
 *
 * @param {listProps} props - Contains the list data.
 * @returns {JSX.Element} The rendered List component.
 */
export default function List({
  id,
  name,
  content,
  ariaLabel,
  contentList,
}: listProps): JSX.Element {
  return (
    <Layout type="section" id={id}>
      <Layout type="article">
        <Typography type="h3" className=" mb-5">
          {name}
        </Typography>
        <Show>
          <Show.When isTrue={!!content}>
            <Typography type="p" className="mb-3">
              {content}
            </Typography>
          </Show.When>
        </Show>
      </Layout>
      <Layout type="article">
        <ul className="list-disc ml-8" aria-label={ariaLabel}>
          <Each
            of={contentList.split("&")}
            render={(item: string, index: number) => {
              const [firstItem, secondItem] = splitTextByLastChar(item, ":");

              return (
                <li key={index} className="my-2">
                  <Typography type="code">{firstItem}</Typography>:{" "}
                  <span>{secondItem}</span>
                </li>
              );
            }}
          />
        </ul>
      </Layout>
    </Layout>
  );
}
