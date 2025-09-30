import type { JSX } from "react";

import Layout from "@/components/layouts/layout";
import { cn } from "@/lib/utils";

import {
  SidebarProps,
  SidebarContentProps,
  SidebarHeaderProps,
} from "./interface";

export function Sidebar({ className, children }: SidebarProps): JSX.Element {
  return (
    <Layout type="div" className={cn("w-full px-4 pb-4", className)}>
      {children}
    </Layout>
  );
}

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

export function SidebarHeader({
  children,
  className,
}: SidebarHeaderProps): JSX.Element {
  return (
    <Layout type="div" className={`py-2 font-semibold ${className}`}>
      {children}
    </Layout>
  );
}
