"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";

import { Each } from "@/components/utilities/each/each";
import Show from "@/components/utilities/conditional_rendering/show";

import { Link, usePathname } from "@/components/navigation/navigation";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { ChartNoAxesGantt } from "lucide-react";

interface LinksProps {
  keys: string[];
  links: string;
  type: "desktop" | "mobile";
}

/**
 * Links component renders a navigation menu based on the provided keys and type.
 * It supports both desktop and mobile layouts, rendering a different UI based on the `type` prop.
 * The active link is dynamically determined based on the current pathname.
 *
 * Props:
 * - keys (string): Link keys translation.
 * - links (string): The key object of the translation json file.
 * - type (desktop | mobile): The type of display UI.
 *
 * @param {LinksProps} props - Contains the keys to display in the navigation, the links object for translations, and the type (desktop or mobile).
 * @returns {JSX.Element} The rendered navigation component.
 */
export default function Links({ keys, links, type }: LinksProps): JSX.Element {
  const pathname = usePathname();
  const t = useTranslations(links);

  /**
   * Determines the variant of the button (active or inactive) based on the current pathname and link.
   *
   * @param {string} pathname - The current pathname.
   * @param {string} link - The link to check against the pathname.
   * @returns {"default" | "ghost"} The variant of the button.
   */
  const checkActiveLink = (
    pathname: string,
    link: string
  ): "default" | "ghost" => {
    const [firstSegment, secondSegment] = pathname.slice(1).split("/");

    if (
      firstSegment === link &&
      secondSegment !== "hooks" &&
      secondSegment !== "utilities"
    ) {
      return "default";
    } else if (secondSegment === link) {
      return "default";
    }
    return "ghost";
  };

  /**
   * Renders a single navigation link.
   *
   * @param {string} item - The key representing the navigation item.
   * @param {number} index - The index of the item in the array.
   * @returns {JSX.Element} The rendered Link component.
   */
  const renderLink = (item: string, index: number): JSX.Element => (
    <Link
      key={index}
      href={`/${
        item === "Docs" ? item.toLowerCase() : `docs/${item.toLowerCase()}`
      }`}
      className={cn(
        buttonVariants({
          variant: checkActiveLink(pathname, item.toLowerCase()),
        }),
        type === "mobile" ? "w-full flex justify-start" : ""
      )}
    >
      {t(item)}
    </Link>
  );

  return (
    <Show>
      <Show.When isTrue={type === "desktop"}>
        <nav className="hidden md:flex gap-2">
          <Each of={keys} render={renderLink} />
        </nav>
      </Show.When>
      <Show.When isTrue={type === "mobile"}>
        <Sheet>
          <SheetTrigger className="block mr-1 mt-1 md:hidden">
            <ChartNoAxesGantt />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-wrap gap-2">
              <Each of={keys} render={renderLink} />
            </nav>
            <Separator className="mt-2 h-[2px]" />
          </SheetContent>
        </Sheet>
      </Show.When>
    </Show>
  );
}
