"use client";

import type { JSX } from "react";
import { useTranslations, useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, usePathname } from "@/components/navigation/navigation";
import Show from "@/components/utilities/show/show";
import Each from "@/components/utilities/each/each";
import Typography from "@/components/typography/typography";
import { cn } from "@/lib/utils";

import { locales } from "@/config/locales";

const translation: string = "Header.Language";

export function LanguageToggle(): JSX.Element {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations(translation);

  /**
   * Renders a single theme item.
   *
   * @param {string} localeSelect - The name of theme.
   * @param {number} index - The index of the item in the array.
   * @returns {JSX.Element} The rendered DropdownMenuItem component.
   */
  const renderLocales = (localeSelect: string, index: number): JSX.Element => {
    const isActive = locale === localeSelect.toLowerCase();

    return (
      <DropdownMenuItem asChild key={index}>
        <Link href={pathname} locale={localeSelect}>
          <span
            className={cn(
              "mr-3 block size-2 rounded-full",
              isActive ? "bg-current" : "bg-transparent",
            )}
          ></span>
          {localeSelect === "en" && t("English")}
          {localeSelect === "pl" && t("Polish")}
        </Link>
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Toggle language">
          <Show>
            <Show.When isTrue={locale === "en"}>EN</Show.When>
            <Show.When isTrue={locale === "pl"}>PL</Show.When>
          </Show>
          <Typography type="span" className="sr-only">
            {t("ToggleLanguage")}
          </Typography>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        aria-label="Language options"
        className="border-muted"
      >
        <Each of={locales} render={renderLocales} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
