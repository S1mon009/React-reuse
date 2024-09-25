import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Layout } from "@/components/layouts/layout";
import { Link } from "@/components/navigation/navigation";
import { Each } from "@/components/utilities/each/each";
import { cn } from "@/lib/utils";

interface prevNextProps {
  link: string;
  title: string;
  description: string;
}

interface footerProps {
  data: prevNextProps[];
}

/**
 * Footer component that displays navigation cards for previous/next items.
 *
 * Props:
 * - data (array(object)):
 *  - link (string): Link to page
 *  - title (string): Page title
 *  - description (string): Previous or Next
 *
 * @param {footerProps} props - Contains data object with link, title, description keys.
 * @returns {JSX.Element} The rendered Footer component.
 */
export default function Footer({ data }: footerProps): JSX.Element {
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
        render={(item, index: number) => {
          if (item.link) {
            return (
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
            );
          }
          return <></>;
        }}
      />
    </Layout>
  );
}
