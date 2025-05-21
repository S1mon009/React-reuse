"use client";

import { useState, useEffect, type JSX, Fragment } from "react";
import { useTranslations, useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandDialog,
  CommandShortcut,
} from "@/components/ui/command";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@/components/navigation/navigation";
import Each from "@/components/utilities/each/each";
import Typography from "@/components/typography/typography";
import { Search, Circle, Bot } from "lucide-react";

import { getContentStructure } from "@/lib/file_structure/file-structure";
import { capitalize } from "@/lib/helpers/text";
import { FileMetadata, LocaleStructure } from "@/lib/file_structure/interface";

const searchTranslation: string = "System.SearchBar";
const translation: string = "System.Navigation";

export default function Command(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<LocaleStructure | null>(null);
  const t = useTranslations(translation);
  const search = useTranslations(searchTranslation);
  const locale = useLocale();

  useEffect(() => {
    const fetchStructure = async () => {
      const res = await fetch(`/api/get-folder-structure?locale=${locale}`);
      const data = await res.json();
      setData(data);
    };
    fetchStructure();
  }, [locale]);

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
                of={Object.keys(data?.structure || {})}
                render={(item, index) => (
                  <Fragment key={index}>
                    <CommandGroup heading={t(capitalize(item))}>
                      <Each
                        of={data?.structure[item] as FileMetadata[]}
                        render={(data_item, data_index: number) => (
                          <Link href={data_item.link} key={data_index}>
                            <CommandItem className="cursor-pointer">
                              <Circle />
                              <Typography type="span">
                                {data_item.name}
                              </Typography>
                            </CommandItem>
                          </Link>
                        )}
                      />
                    </CommandGroup>
                  </Fragment>
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
        aria-label="Search button with icon"
      >
        <Search />
      </Button>
    </>
  );
}
