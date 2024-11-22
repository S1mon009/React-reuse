"use client";

import { useState, useEffect } from "react";
import { Search, Circle } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Each } from "@/components/utilities/each/each";
import { Typography } from "@/components/typography/typography";
import { Link } from "@/components/navigation/navigation";
import { useTranslations } from "next-intl";
import { keys as HeaderKeys } from "@/keys/links-keys";
import { keys as LinksKeys } from "@/keys/sidebar-links-keys";

const translation: string = "Data";

export default function Command() {
  const [open, setOpen] = useState<boolean>(false);
  const t = useTranslations(translation);

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
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <Each
            of={HeaderKeys}
            render={(headerKey, headerIndex) => (
              <>
                <CommandGroup
                  heading={t(`${headerKey}.Name`)}
                  key={headerIndex}
                >
                  <Each
                    of={LinksKeys[headerIndex]}
                    render={(link, index) => (
                      <Link href={t(`${headerKey}.Items.${link}.Link`)}>
                        <CommandItem key={index} className="cursor-pointer">
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
      </CommandDialog>
      <Button
        onClick={() => setOpen(true)}
        className="hidden md:inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
      >
        <Typography type="span" className="hidden lg:inline-flex">
          Search documentation...
        </Typography>
        <Typography type="span" className="inline-flex lg:hidden">
          Search...
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
        className="flex md:hidden"
      >
        <Search />
      </Button>
    </>
  );
}
