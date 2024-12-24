"use client";

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
import { cn } from "@/lib/utils";

const translation: string = "Header.Theme";

/**
 * ModeToggle component allows users to switch between light, dark, and system themes.
 * The component uses a dropdown menu to present the options and updates the theme
 * accordingly when an option is selected.
 *
 * @returns {JSX.Element} The rendered ModeToggle component.
 */
export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const t = useTranslations(translation);
  const themes: Array<"light" | "dark" | "system"> = [
    "light",
    "dark",
    "system",
  ];

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
   * @param {string} themeSelect - The name of theme.
   * @param {number} index - The index of the item in the array.
   * @returns {JSX.Element} The rendered DropdownMenuItem component.
   */
  const renderThemes = (
    themeSelect: "light" | "dark" | "system",
    index: number
  ): JSX.Element => {
    const isActive = theme === themeSelect;
    return (
      <DropdownMenuItem
        key={index}
        onClick={changeMode.bind(null, themeSelect)}
        aria-label={t(
          themeSelect.charAt(0).toUpperCase() + themeSelect.slice(1)
        )}
        className="flex items-center justify-start"
      >
        <span
          className={cn(
            "block size-2 rounded-full mr-3",
            isActive ? "bg-current" : "bg-transparent"
          )}
        ></span>
        {t(themeSelect.charAt(0).toUpperCase() + themeSelect.slice(1))}
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild aria-label="Toggle theme">
        <Button variant="outline" size="icon">
          <Sun
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            aria-hidden="true"
            focusable="false"
          />
          <Moon
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            aria-hidden="true"
            focusable="false"
          />
          <span className="sr-only"> {t("ToggleTheme")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        aria-label="Theme modes"
        className="border-muted"
      >
        <Each of={themes} render={renderThemes} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
