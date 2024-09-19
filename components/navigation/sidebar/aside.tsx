"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/navigation/sidebar/sidebar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/layouts/layout";
import { Each } from "@/components/utilities/each/each";
import { Link } from "@/components/navigation/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "@/components/navigation/navigation";
import { keys as sidebarHeaderKeys } from "@/keys/sidebar-header-keys";
import { keys as sidebarLinksKeys } from "@/keys/sidebar-links-keys";

const translation: string = "Data";
/**
 * Aside component render a aside element with sidebar components.
 * The active link is dynamically determined based on the current pathname.
 *
 * @returns {JSX.Element} The rendered aside component.
 */
export default function Aside(): JSX.Element {
  const t = useTranslations(translation);
  const pathname = usePathname();

  return (
    <Layout type="aside">
      <Sidebar>
        <Each
          of={sidebarHeaderKeys}
          render={(sidebarHeaderKey, sidebarHeaderIndex) => (
            <SidebarContent key={sidebarHeaderIndex}>
              <SidebarHeader>{t(`${sidebarHeaderKey}.Name`)}</SidebarHeader>
              <Layout
                type="nav"
                className="flex flex-wrap gap-2 pl-2"
                aria-label={t(`${sidebarHeaderKey}.Name`)}
              >
                <Each
                  of={sidebarLinksKeys[sidebarHeaderIndex]}
                  render={(sidebarLinkKey: any, sidebarLinkIndex: number) => {
                    return (
                      <Link
                        href={t(
                          `${sidebarHeaderKey}.Items.${sidebarLinkKey}.Link`
                        )}
                        className={cn(
                          buttonVariants({
                            variant:
                              pathname ===
                              t(
                                `${sidebarHeaderKey}.Items.${sidebarLinkKey}.Link`
                              )
                                ? "secondary"
                                : "ghost",
                            size: "sm",
                            className: "flex justify-start",
                          }),
                          "w-full"
                        )}
                        aria-current={
                          pathname ===
                          t(`${sidebarHeaderKey}.Items.${sidebarLinkKey}.Link`)
                            ? "page"
                            : undefined
                        }
                        key={sidebarLinkIndex}
                      >
                        {t(`${sidebarHeaderKey}.Items.${sidebarLinkKey}.Name`)}
                      </Link>
                    );
                  }}
                />
              </Layout>
            </SidebarContent>
          )}
        />
      </Sidebar>
    </Layout>
  );
}
