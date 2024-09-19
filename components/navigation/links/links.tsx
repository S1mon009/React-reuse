"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { buttonVariants } from "@/components/ui/button";
import { Each } from "@/components/utilities/each/each";
import Show from "@/components/utilities/conditional_rendering/show";
import { Layout } from "@/components/layouts/layout";
import Aside from "@/components/navigation/sidebar/aside";
import { Link, usePathname } from "@/components/navigation/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ChartNoAxesGantt } from "lucide-react";
import { keys } from "@/keys/links-keys";

const translation: string = "Header.Links";

interface linksProps {
  type: "desktop" | "mobile";
}

/**
 * Links component renders a navigation menu based on the keys and type.
 * It supports both desktop and mobile layouts, rendering a different UI based on the `type` prop.
 * The active link is dynamically determined based on the current pathname.
 *
 * Props:
 * - type (desktop | mobile): The type of display UI.
 *
 * @param {linksProps} props - Contains the keys to display in the navigation, the links object for translations, and the type (desktop or mobile).
 * @returns {JSX.Element} The rendered Links component.
 */
export default function Links({ type }: linksProps): JSX.Element {
  const pathname = usePathname();
  const t = useTranslations(translation);

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
      href={t(`${item}.Link`)}
      className={cn(
        buttonVariants({
          variant: checkActiveLink(pathname, item.toLowerCase()),
        }),
        type === "mobile" ? "w-full flex justify-start" : ""
      )}
    >
      {t(`${item}.Title`)}
    </Link>
  );

  return (
    <Show>
      <Show.When isTrue={type === "desktop"}>
        <Layout type="nav" className="hidden md:flex gap-2">
          <Each of={keys} render={renderLink} />
        </Layout>
      </Show.When>
      <Show.When isTrue={type === "mobile"}>
        <Sheet>
          <SheetTrigger className="block mr-1 mt-1 lg:hidden">
            <ChartNoAxesGantt />
          </SheetTrigger>
          <SheetContent side="left" aria-describedby="Mobile navigation">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <Layout type="nav" className="flex flex-wrap gap-2">
              <Each of={keys} render={renderLink} />
            </Layout>
            <Separator className="mt-2 h-[2px]" />
            <ScrollArea className="h-full w-full pb-40">
              <Aside />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </Show.When>
    </Show>
  );
}
