"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Typography } from "@/components/typography/typography";
import Show from "@/components/utilities/conditional_rendering/show";
import { Each } from "@/components/utilities/each/each";
import { Link, usePathname } from "@/components/navigation/navigation";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { locales } from "@/config/locales";

const translation: string = "Header.Language";

/**
 * LanguageToggle component for switching between different languages.
 *
 * This component displays a dropdown menu with options to switch between
 * different languages. The currently selected language is shown on the button,
 * and users can select another language from the dropdown.
 *
 * @returns {JSX.Element} The rendered LanguageToggle component.
 */
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
              "block size-2 rounded-full mr-3",
              isActive ? "bg-current" : "bg-transparent"
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
