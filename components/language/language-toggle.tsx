"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Show from "@/components/utilities/conditional_rendering/show";

import { Link, usePathname } from "@/components/navigation/navigation";

import { useTranslations, useLocale } from "next-intl";

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
  const t = useTranslations("Header.Language");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Toggle language">
          <Show>
            <Show.When isTrue={locale === "en"}>EN</Show.When>
            <Show.When isTrue={locale === "pl"}>PL</Show.When>
          </Show>
          <span className="sr-only"> {t("ToggleLanguage")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" aria-label="Language options">
        <DropdownMenuItem asChild>
          <Link href={pathname} locale="en">
            {t("English")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={pathname} locale="pl">
            {t("Polish")}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
