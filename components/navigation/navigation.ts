import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { locales /* ... */ } from "@/config/locales";

/**
 * This function sets up shared navigation utilities for the application,
 * including a localized `Link` component, `redirect` function, `usePathname`,
 * and `useRouter` hooks. These utilities are configured to work with
 * multiple locales, allowing seamless navigation and localization throughout
 * the app.
 */
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales /* ... */ });
