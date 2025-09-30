"use client";

import { useEffect, useState, type JSX } from "react";
import { useTranslations } from "next-intl";

import { buttonVariants } from "@/components/ui/button";
import { usePathname, Link } from "@/components/navigation/navigation";
import Each from "@/components/utilities/each/each";
import Typography from "@/components/typography/typography";
import { cn } from "@/lib/utils";

import { SectionListProps } from "./interface";

export default function SectionList({
  sectionId,
}: SectionListProps): JSX.Element {
  const [headings, setHeadings] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const pathname = usePathname();
  const onThisPage = useTranslations();

  const handleScroll = (index: number, tag: string) => {
    setActiveIndex(index);
    const element = document.getElementById(tag);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (section) {
      const allHeadings = Array.from(section.querySelectorAll("h2, h3, h4"));
      const headingData = allHeadings.map((heading) => {
        const id = heading.textContent?.toLowerCase().replace(/\s+/g, "-");
        if (id) {
          heading.id = id;
        }
        return {
          text: heading.textContent,
          type: heading.tagName.toLowerCase(),
          id: id,
        };
      });
      setHeadings(headingData);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = headingData.findIndex(
                (heading) => heading.id === entry.target.id
              );
              if (index !== -1) {
                setActiveIndex(index);
              }
            }
          });
        },
        { rootMargin: "0px 0px -50% 0px" }
      );

      allHeadings.forEach((heading) => {
        observer.observe(heading);
      });

      return () => {
        observer.disconnect();
      };
    }
  }, [sectionId]);

  return (
    <>
      <Typography type="p" className="my-2 font-semibold">
        {onThisPage("System.Navigation.OnThisPage")}
      </Typography>
      <div className="border-l-2 border-muted">
        <Each
          of={headings}
          render={(
            heading: { type: string; text: string; id: string },
            index: number
          ) => (
            <Link
              href={`${pathname}/#${heading.id}`}
              className={cn(
                buttonVariants({
                  variant: "link",
                  className:
                    "flex justify-start items-center rounded-none w-full my-2 text-muted-foreground truncate relative hover:text-current -translate-x-0.5",
                }),
                heading.type === "h3" ? "pl-7" : null,
                heading.type === "h4" ? "pl-9" : null,
                index === activeIndex
                  ? "text-current before:content-[''] before:block before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-current"
                  : null
              )}
              onClick={() => handleScroll(index, heading.id)}
              key={index}
              title={heading.text}
            >
              <span className="truncate">{heading.text}</span>
            </Link>
          )}
        />
      </div>
    </>
  );
}
