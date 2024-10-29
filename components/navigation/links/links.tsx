"use client";

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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Each } from "@/components/utilities/each/each";
import Show from "@/components/utilities/conditional_rendering/show";
import { Layout } from "@/components/layouts/layout";
import Aside from "@/components/navigation/sidebar/aside";
import { Link } from "@/components/navigation/navigation";
import { useTranslations } from "next-intl";
import { ChartNoAxesGantt } from "lucide-react";
import { keys } from "@/keys/sidebar-links-keys";

const translation: string = "Header.Menu";
const dataTranslation: string = "Data";
const menuArray: string[] = ["Introduction", "Typesafe", "Quality"];

interface LinksProps {
  type: "desktop" | "mobile";
}

interface ListItemProps {
  title: string;
  href: string;
  children: React.ReactNode;
}

/**
 * Renders a list item for navigation links with appropriate a11y features.
 */
const ListItem = ({ title, href, children }: ListItemProps) => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </Link>
    </NavigationMenuLink>
  </li>
);
ListItem.displayName = "ListItem";

/**
 * Links component renders a navigation menu based on the type (desktop/mobile).
 * It supports a11y and ensures semantic markup for navigation and focus management.
 */
export default function Links({ type }: LinksProps): JSX.Element {
  const t = useTranslations(translation);
  const data = useTranslations(dataTranslation);

  return (
    <Show>
      <Show.When isTrue={type === "desktop"}>
        <Layout type="nav" className="hidden md:flex gap-2">
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
                      render={(item, index) => (
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
                      render={(item, index) => (
                        <ListItem
                          key={index}
                          href={data(`Hooks.Items.${item}.Link`)}
                          title={data(`Hooks.Items.${item}.Name`)}
                        >
                          {data(`Hooks.Items.${item}.Content.Description`)}
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
                      render={(item, index) => (
                        <ListItem
                          key={index}
                          href={data(`Utilities.Items.${item}.Link`)}
                          title={data(`Utilities.Items.${item}.Name`)}
                        >
                          {data(`Utilities.Items.${item}.Content.Description`)}
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
            <ScrollArea className="h-full w-full pb-6">
              <Aside />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </Show.When>
    </Show>
  );
}
