import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/sidebar/sidebar";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";

import { Each } from "@/components/utilities/each/each";

import { Link } from "@/components/navigation/navigation";

import { useTranslations } from "next-intl";

import { keys as sidebarHeaderKeys } from "@/config/sidebar-header-keys";
import { keys as sidebarLinksKeys } from "@/config/sidebar-links-keys";

import { usePathname } from "@/components/navigation/navigation";

export default function Aside() {
  return <aside></aside>;
}
