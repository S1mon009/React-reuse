"use client";

import { useState, useEffect, type JSX } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandDialog,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@/components/navigation/navigation";
import Each from "@/components/utilities/each/each";
import Typography from "@/components/typography/typography";
import { Search, Circle, Bot } from "lucide-react";

import { keys as HeaderKeys } from "@/keys/links-keys";
import { keys as LinksKeys } from "@/keys/sidebar-links-keys";

const translation: string = "Data";
const searchTranslation: string = "SearchBar";

/**
 * Command component that renders a searchable command palette with a dialog-based UI.
 *
 * @returns {JSX.Element} The rendered Command component.
 */
export default function Command(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const t = useTranslations(translation);
  const search = useTranslations(searchTranslation);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Tabs defaultValue="search">
          <TabsList className="ml-3 mt-3">
            <TabsTrigger value="search">
              <Search className="size-4 mr-2" /> Search
            </TabsTrigger>
            <TabsTrigger value="askai">
              <Bot className="size-4 mr-2" />
              Ask AI
            </TabsTrigger>
          </TabsList>
          <TabsContent value="search">
            <CommandInput placeholder={search("InputSearch")} />
            <CommandList>
              <CommandEmpty>{search("NoResults")}</CommandEmpty>
              <Each
                of={HeaderKeys}
                render={(headerKey: string, headerIndex: number) => (
                  <>
                    <CommandGroup
                      heading={t(`${headerKey}.Name`)}
                      key={headerIndex}
                    >
                      <Each
                        of={LinksKeys[headerIndex]}
                        render={(link: string, index: number) => (
                          <Link
                            href={t(`${headerKey}.Items.${link}.Link`)}
                            key={index}
                          >
                            <CommandItem className="cursor-pointer">
                              <Circle />
                              <Typography type="span">
                                {t(`${headerKey}.Items.${link}.Name`)}
                              </Typography>
                            </CommandItem>
                          </Link>
                        )}
                      />
                    </CommandGroup>
                    <CommandSeparator className="last:hidden" />
                  </>
                )}
              />
            </CommandList>
          </TabsContent>
          <TabsContent value="askai" className="h-32 p-3">
            <Typography type="p">Comming soon</Typography>
          </TabsContent>
        </Tabs>
      </CommandDialog>
      <Button
        onClick={() => setOpen(true)}
        className="hidden xl:inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
      >
        <Typography type="span" className="hidden lg:inline-flex">
          {search("ButtonSearchLg")}
        </Typography>
        <Typography type="span" className="inline-flex lg:hidden">
          {search("ButtonSearchMd")}
        </Typography>
        <CommandShortcut className="pointer-events-none absolute right-[0.3rem] top-[0.6rem] hidden h-5 select-none items-center gap-1 rounded border-muted bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <Typography type="span" className="text-xs">
            ⌘
          </Typography>
          K
        </CommandShortcut>
      </Button>
      <Button
        onClick={() => setOpen(true)}
        size="icon"
        variant="outline"
        className="flex xl:hidden"
      >
        <Search />
      </Button>
    </>
  );
}
