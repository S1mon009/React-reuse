"use client";

import type { JSX } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

/**
 * ThemeProvider component wraps the application with the NextThemesProvider,
 * enabling theme management (light, dark, and system) across the app.
 *
 * @param {ThemeProviderProps} props - Props to configure the NextThemesProvider.
 * @returns {JSX.Element} The wrapped application with theme management capabilities.
 */
export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps): JSX.Element {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
