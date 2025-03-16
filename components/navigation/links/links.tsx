"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "@/components/navigation/navigation";
import Show from "@/components/utilities/show/show";
import Each from "@/components/utilities/each/each";
import Aside from "@/components/navigation/sidebar/aside";
import Typography from "@/components/typography/typography";
import Layout from "@/components/layouts/layout";
import { ChartNoAxesGantt } from "lucide-react";

import { ListItemProps, LinksProps } from "./interface";
import { keys } from "@/keys/sidebar-links-keys";

const translation: string = "Header.Menu";
const dataTranslation: string = "Data";
const menuArray: string[] = ["Introduction", "Typesafe", "Quality"];

/**
 * Renders a list item for navigation links with appropriate a11y features.
 *
 * Props:
 * - title: string
 * - href: string
 * - children: Readonly<React.ReactNode>
 *
 * @param {ListItemProps} props - Contains the title, href and children for component.
 * @returns {JSX.Element} The rendered ListItem component
 */
const ListItem = ({ title, href, children }: ListItemProps): JSX.Element => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        <Layout type="div" className="text-sm font-medium leading-none">
          {title}
        </Layout>
        <Typography
          type="p"
          className="line-clamp-2 text-sm leading-snug text-muted-foreground"
        >
          {children}
        </Typography>
      </Link>
    </NavigationMenuLink>
  </li>
);
ListItem.displayName = "ListItem";

/**
 * Links component renders a navigation menu based on the type (desktop/mobile).
 * It supports a11y and ensures semantic markup for navigation and focus management.
 *
 * Props:
 * - type("desktop" | "mobile")
 *
 * @param {LinksProps} props - Contains the type of Links component
 * @returns {JSX.Element} The rendered Links component
 */
export default function Links({ type }: LinksProps): JSX.Element {
  const t = useTranslations(translation);
  const data = useTranslations(dataTranslation);

  return (
    <Show>
      <Show.When isTrue={type === "desktop"}>
        <Layout type="nav" className="hidden lg:flex gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {t("GettingStarted.Name")}
                </NavigationMenuTrigger>
                <NavigationMenuContent aria-label="Getting Started Menu">
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href={t("GettingStarted.Main.Link")}
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            React reuse
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            {t("GettingStarted.Main.Description")}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <Each
                      of={menuArray}
                      render={(item: string, index: number) => (
                        <ListItem
                          key={index}
                          href={t(`GettingStarted.${item}.Link`)}
                          title={t(`GettingStarted.${item}.Name`)}
                        >
                          {t(`GettingStarted.${item}.Description`)}
                        </ListItem>
                      )}
                    />
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {data("Hooks.Name")}
                </NavigationMenuTrigger>
                <NavigationMenuContent aria-label="Hooks Menu">
                  <ul className="grid gap-3 p-4 md:w-[500px] lg:w-[600px] md:grid-cols-2">
                    <Each
                      of={keys[1].slice(0, 6)}
                      render={(item: string, index: number) => (
                        <ListItem
                          key={index}
                          href={data(`Hooks.Items.${item}.Link`)}
                          title={data(`Hooks.Items.${item}.Name`)}
                        >
                          {data(`Hooks.Items.${item}.Description`)}
                        </ListItem>
                      )}
                    />
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {data("Utilities.Name")}
                </NavigationMenuTrigger>
                <NavigationMenuContent aria-label="Utilities Menu">
                  <ul className="grid gap-3 p-4 md:w-[500px] lg:w-[600px] md:grid-cols-2">
                    <Each
                      of={keys[2].slice(0, 6)}
                      render={(item: string, index: number) => (
                        <ListItem
                          key={index}
                          href={data(`Utilities.Items.${item}.Link`)}
                          title={data(`Utilities.Items.${item}.Name`)}
                        >
                          {data(`Utilities.Items.${item}.Description`)}
                        </ListItem>
                      )}
                    />
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="ghost" disabled>
                  {data("Components.Name")}
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="ghost" disabled>
                  {data("Animations.Name")}
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Layout>
      </Show.When>
      <Show.When isTrue={type === "mobile"}>
        <Sheet>
          <SheetTrigger
            className="block mr-1 mt-1 lg:hidden"
            aria-label="Open menu"
          >
            <ChartNoAxesGantt />
          </SheetTrigger>
          <SheetContent side="left" aria-describedby="Mobile navigation">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>
            <Separator className="mt-2 h-[2px]" />
            <ScrollArea className="h-full w-[110%] -translate-x-7 pb-6">
              <Aside />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </Show.When>
    </Show>
  );
}
