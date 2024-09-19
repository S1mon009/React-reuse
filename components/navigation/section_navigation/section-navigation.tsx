"use client";

import { useState, useEffect } from "react";
import { usePathname, Link } from "@/components/navigation/navigation";
import { Each } from "@/components/utilities/each/each";
import { buttonVariants } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface sectionNavigationProps {
  scrollItemsArray: string[];
  translation: string;
}

export default function SectionNavigation({
  scrollItemsArray,
  translation,
}: sectionNavigationProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const pathname = usePathname();
  const t = useTranslations(translation);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = (entry.target as HTMLElement).id;
          const index = scrollItemsArray.indexOf(
            id === "api"
              ? id.toUpperCase()
              : id.slice(0, 1).toUpperCase() + id.slice(1)
          );
          setActiveIndex(index);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 1,
    });

    scrollItemsArray.forEach((id) => {
      const element = document.getElementById(id.toLowerCase());
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      scrollItemsArray.forEach((id) => {
        const element = document.getElementById(id.toLowerCase());
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [scrollItemsArray]);

  return (
    <ul>
      <Each
        of={scrollItemsArray}
        render={(item: string, index: number) => {
          const tag = item.toLowerCase();

          return (
            <Link
              href={`${pathname}/#${tag}`}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: `flex justify-start items-center rounded-l-none w-full my-2 text-foreground hover:border-l-2 ${
                    index === activeIndex && "border-l-2"
                  }`,
                })
              )}
              onClick={() => setActiveIndex(index)}
              key={index}
            >
              {t(item)}
            </Link>
          );
        }}
      />
    </ul>
  );
}
