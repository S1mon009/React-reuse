import type { JSX } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Link } from "@/components/navigation/navigation";
import Show from "@/components/utilities/show/show";
import Each from "@/components/utilities//each/each";
import Layout from "@/components/layouts/layout";
import { cn } from "@/lib/utils";

import { FooterProps } from "./interface";

/**
 * Footer component that displays navigation cards for previous/next items.
 *
 * Props:
 * - data (array(object)):
 *  - link (string): Link to page
 *  - title (string): Page title
 *  - description (string): Previous or Next
 *
 * @param {FooterProps} props - Contains data object with link, title, description keys.
 * @returns {JSX.Element} The rendered Footer component.
 */
export default function Footer({ data }: FooterProps): JSX.Element {
  let className: string = "";

  if (!data[0].link) {
    className = "justify-end";
  } else if (!data[1].link) {
    className = "justify-start";
  } else {
    className = "justify-between";
  }

  return (
    <Layout type="footer" className={cn("flex flex-wrap gap-2", className)}>
      <Each
        of={data}
        render={(
          item: { link: string; title: string; description: string },
          index: number
        ) => (
          <Show key={index}>
            <Show.When isTrue={!!item.link}>
              <Link href={item.link} className="w-full md:w-[40%] lg:w-2/5">
                <Card
                  className={cn(
                    "flex",
                    index === 1 ? "justify-end" : null,
                    "border-muted cursor-pointer hover:border-primary"
                  )}
                >
                  <CardHeader className="p-3">
                    <CardDescription dir={index === 1 ? "rtl" : "ltl"}>
                      {item.title}
                    </CardDescription>
                    <CardTitle>{item.description}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </Show.When>
          </Show>
        )}
      />
    </Layout>
  );
}
