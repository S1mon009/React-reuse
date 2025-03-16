import type { JSX } from "react";

import Layout from "@/components/layouts/layout";
import { cn } from "@/lib/utils";

import {
  SidebarProps,
  SidebarContentProps,
  SidebarHeaderProps,
} from "./interface";

/**
 * Sidebar component renders a container for the sidebar content.
 *
 * Props:
 * - children
 *
 * @param {SidebarProps} props - Contains the children elements and an optional className for additional styling.
 * @returns {JSX.Element} The rendered Sidebar component, which wraps the provided children elements.
 */
export function Sidebar({ className, children }: SidebarProps): JSX.Element {
  return (
    <Layout type="div" className={cn("w-full px-4 pb-4", className)}>
      {children}
    </Layout>
  );
}

/**
 * SidebarContent component renders the content section of the sidebar.
 *
 * @param {SidebarContentProps} props - Contains the children elements and an optional className for additional styling.
 * @returns {JSX.Element} The rendered SidebarContent component, which wraps the provided children elements.
 */
export function SidebarContent({
  children,
  className,
}: SidebarContentProps): JSX.Element {
  return (
    <Layout type="div" className={cn(className)}>
      {children}
    </Layout>
  );
}

/**
 * SidebarHeader component renders the header section of the sidebar.
 *
 * @param {SidebarHeaderProps} props - Contains the children elements and an optional className for additional styling.
 * @returns {JSX.Element} The rendered SidebarHeader component, typically used for section titles.
 */
export function SidebarHeader({
  children,
  className,
}: SidebarHeaderProps): JSX.Element {
  return (
    <Layout type="div" className={`font-semibold py-2 ${className}`}>
      {children}
    </Layout>
  );
}
