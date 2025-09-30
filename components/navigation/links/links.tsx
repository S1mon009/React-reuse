"use client";

import { useEffect, useState, type JSX } from "react";
import { useLocale } from "next-intl";
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
  ContentTree,
} from "@/components/navigation";
import Show from "@/components/utilities/show/show";
import Each from "@/components/utilities/each/each";
import Layout from "@/components/layouts/layout";
import { ChartNoAxesGantt } from "lucide-react";

import { LinksProps } from "./interface";

export default function Links({ type }: LinksProps): JSX.Element {
  const locale = useLocale();
  const [structure, setStructure] = useState<any>(null);
  useEffect(() => {
    const fetchStructure = async () => {
      const res = await fetch(`/api/get-folder-structure?locale=${locale}`);
      const { structure } = await res.json();
      setStructure(structure);
    };
    fetchStructure();
  }, [locale]);

  return (
    <Show>
      <Show.When isTrue={type === "desktop"}>
        <Layout type="nav" className="hidden gap-2 lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {structure &&
                typeof structure === "object" &&
                Object.keys(structure).length > 0 && (
                  <MainList
                    objectKey={Object.keys(structure)[0]}
                    structure={structure}
                  />
                )}
              {structure &&
                typeof structure === "object" &&
                Object.keys(structure).length > 0 && (
                  <Each
                    of={Object.keys(structure).slice(1)}
                    render={(key, index) => (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuTrigger>
                          <Trigger text={key} />
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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
                )}
              {/* <Each
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
              /> */}
            </NavigationMenuList>
          </NavigationMenu>
        </Layout>
      </Show.When>
      <Show.When isTrue={type === "mobile"}>
        <Sheet>
          <SheetTrigger
            className="mr-1 mt-1 block lg:hidden"
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
