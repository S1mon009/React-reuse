"use client";

import { useState, useEffect, type JSX } from "react";
import { useTranslations } from "next-intl";

import { SidebarHeader } from "@/components/navigation";
import { buttonVariants } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/navigation/navigation";
import { usePathname } from "@/components/navigation/navigation";
import Show from "@/components/utilities/show/show";
import Each from "@/components/utilities/each/each";
import Layout from "@/components/layouts/layout";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { getDayDifference } from "@/lib/helpers/date";
import { capitalize } from "@/lib/helpers/text";
import { ContentTreeItemProps } from "./interface";

const translation: string = "System.Navigation";

export default function ContentTreeItem({
  name,
  content,
  openPathName,
}: ContentTreeItemProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const t = useTranslations(translation);
  const date = useTranslations();
  const pathname = usePathname();

  const openCollapsible = () => {
    setIsOpen((prevState) => {
      let updatedIsOpen = prevState;
      updatedIsOpen = !updatedIsOpen;
      return updatedIsOpen;
    });
  };

  useEffect(() => {
    const path = pathname.split("/").slice(1).slice(0, -1).join("/");

    setIsOpen((prevState) => {
      let updatedIsOpen = prevState;
      if (path.includes(openPathName || "")) updatedIsOpen = true;

      return updatedIsOpen;
    });
  }, [pathname, openPathName]);

  return (
    <Collapsible open={isOpen}>
      <CollapsibleTrigger
        onClick={() => openCollapsible()}
        className={cn(
          buttonVariants({
            variant: "ghost",
            size: "sm",
          }),
          "my-2 flex w-full items-center justify-between",
        )}
      >
        <SidebarHeader>{t(capitalize(name))}</SidebarHeader>

        <ChevronRight
          className="transition-transform duration-200"
          style={{
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Layout type="nav" className="flex flex-wrap gap-2" aria-label={name}>
          <Each
            of={content}
            render={(item, index) => {
              return (
                <Link
                  href={item.link}
                  key={index}
                  className={cn(
                    buttonVariants({
                      variant: pathname === item.link ? "secondary" : "ghost",
                      size: "sm",
                      className: "flex justify-start py-0",
                    }),
                    "relative ml-[30px] w-[calc(100%-40px)] transition-all duration-300 before:absolute before:-left-[10px] before:h-[calc(100%+10px)] before:w-[1px] before:bg-muted before:content-[''] hover:before:bg-foreground",
                    pathname === item.link ? "before:bg-foreground" : null,
                  )}
                  aria-current={pathname === item.link ? "page" : undefined}
                >
                  {item.name}
                  <Show>
                    <Show.When isTrue={getDayDifference(item.createdAt) < 30}>
                      <Badge className="absolute right-0 top-0 -translate-y-2 translate-x-2 scale-[80%]">
                        {date("System.New")}
                      </Badge>
                    </Show.When>
                  </Show>
                </Link>
              );
            }}
          />
        </Layout>
      </CollapsibleContent>
    </Collapsible>
  );
}
