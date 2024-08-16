"use client";

import * as React from "react";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Each } from "@/components/utilities/each/each";

import { useTranslations } from "next-intl";

/**
 * ModeToggle component allows users to switch between light, dark, and system themes.
 * The component uses a dropdown menu to present the options and updates the theme
 * accordingly when an option is selected.
 *
 * @returns {JSX.Element} The rendered ModeToggle component.
 */
export function ModeToggle() {
  const { setTheme } = useTheme();
  const t = useTranslations("Header.Theme");
  const themes: string[] = ["Light", "Dark", "System"];

  /**
   * changeMode is a helper function to update the theme.
   *
   * @param {"light" | "dark" | "system"} mode - The theme mode to switch to ("light", "dark", or "system").
   */
  const changeMode = (mode: "light" | "dark" | "system"): void =>
    setTheme(mode);

  /**
   * Renders a single theme item.
   *
   * @param {any} theme - The name of theme.
   * @param {number} index - The index of the item in the array.
   * @returns {JSX.Element} The rendered DropdownMenuItem component.
   */
  const renderThemes = (theme: any, index: number): JSX.Element => {
    return (
      <DropdownMenuItem
        key={index}
        onClick={changeMode.bind(null, theme.toLowerCase())}
      >
        {t(theme)}
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only"> {t("ToggleTheme")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Each of={themes} render={renderThemes} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
