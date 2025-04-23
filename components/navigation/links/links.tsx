import type { JSX } from "react";

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
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  ListItem,
  Trigger,
  MainList,
} from "@/components/navigation/links/list/list";
import ContentTree from "@/components/navigation/sidebar/content_tree/content-tree";
import Show from "@/components/utilities/show/show";
import Each from "@/components/utilities/each/each";
import Layout from "@/components/layouts/layout";
import { ChartNoAxesGantt } from "lucide-react";

import { getContentStructure } from "@/lib/file_structure/file-structure";

import { LinksProps } from "./interface";

export default async function Links({
  locale,
  type,
}: LinksProps): Promise<JSX.Element> {
  const { structure } = await getContentStructure(locale);

  return (
    <Show>
      <Show.When isTrue={type === "desktop"}>
        <Layout type="nav" className="hidden lg:flex gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <MainList
                objectKey={Object.keys(structure)[0]}
                structure={structure}
              />
              <Each
                of={Object.keys(structure).slice(1)}
                render={(key, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuTrigger>
                      <Trigger text={key} />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[500px] lg:w-[600px] md:grid-cols-2">
                        <Each
                          of={structure[key].slice(0, 6)}
                          render={(item: any, index: number) => (
                            <ListItem
                              key={index}
                              href={item.link}
                              title={item.name}
                            >
                              {item.description}
                            </ListItem>
                          )}
                        />
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}
              />
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
              <ContentTree locale={locale} />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </Show.When>
    </Show>
  );
}
