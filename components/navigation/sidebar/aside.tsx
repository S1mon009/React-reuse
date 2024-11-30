"use client";

import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/navigation/sidebar/sidebar";
import { buttonVariants } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/layouts/layout";
import { Each } from "@/components/utilities/each/each";
import Show from "@/components/utilities/conditional_rendering/show";
import { Link } from "@/components/navigation/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "@/components/navigation/navigation";
import { getDayDifference } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { keys as sidebarHeaderKeys } from "@/keys/links-keys";
import { keys as sidebarLinksKeys } from "@/keys/sidebar-links-keys";

const translation: string = "Data";

/**
 * Aside component renders a list of links for sidebar content.
 *
 * @returns {JSX.Element} The rendered Aside component.
 */
export default function Aside(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean[]>([false, false, false]);
  const t = useTranslations(translation);
  const date = useTranslations();
  const pathname = usePathname();

  // Toggle collapsible manually when clicked
  const openCollapsible = (index: number) => {
    setIsOpen((prevState) => {
      const updatedIsOpen = [...prevState];
      updatedIsOpen[index] = !updatedIsOpen[index];
      return updatedIsOpen;
    });
  };

  // Automatically open collapsible based on pathname
  useEffect(() => {
    const path = pathname.split("/").slice(1).slice(0, -1).join("/");

    setIsOpen((prevState) => {
      const updatedIsOpen = [...prevState];
      if (path === "docs") updatedIsOpen[0] = true;
      else if (path === "docs/hooks") updatedIsOpen[1] = true;
      else if (path === "docs/utilities") updatedIsOpen[2] = true;
      return updatedIsOpen;
    });
  }, [pathname]);

  return (
    <Layout type="aside">
      <Sidebar>
        <Each
          of={sidebarHeaderKeys}
          render={(sidebarHeaderKey: string, sidebarHeaderIndex: number) => (
            <Collapsible
              open={isOpen[sidebarHeaderIndex]}
              key={sidebarHeaderIndex}
            >
              <SidebarContent>
                <CollapsibleTrigger
                  onClick={() => openCollapsible(sidebarHeaderIndex)}
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    }),
                    "flex justify-between items-center w-full my-2"
                  )}
                >
                  <SidebarHeader>{t(`${sidebarHeaderKey}.Name`)}</SidebarHeader>

                  <ChevronRight
                    className="transition-transform duration-200"
                    style={{
                      transform: isOpen[sidebarHeaderIndex]
                        ? "rotate(90deg)"
                        : "rotate(0deg)",
                    }}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Layout
                    type="nav"
                    className="flex flex-wrap gap-2"
                    aria-label={t(`${sidebarHeaderKey}.Name`)}
                  >
                    <Each
                      of={sidebarLinksKeys[sidebarHeaderIndex]}
                      render={(
                        sidebarLinkKey: string,
                        sidebarLinkIndex: number
                      ) => (
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
                              className: "flex justify-start py-0",
                            }),
                            "relative transition-all duration-300 w-[calc(100%-40px)] ml-[30px] before:absolute before:content-[''] before:h-[calc(100%+10px)] before:w-[1px] before:bg-muted before:-left-[10px] hover:before:bg-foreground",
                            pathname ===
                              t(
                                `${sidebarHeaderKey}.Items.${sidebarLinkKey}.Link`
                              )
                              ? "before:bg-foreground"
                              : null
                          )}
                          aria-current={
                            pathname ===
                            t(
                              `${sidebarHeaderKey}.Items.${sidebarLinkKey}.Link`
                            )
                              ? "page"
                              : undefined
                          }
                          key={sidebarLinkIndex}
                        >
                          {t(
                            `${sidebarHeaderKey}.Items.${sidebarLinkKey}.Name`
                          )}
                          <Show>
                            <Show.When
                              isTrue={
                                sidebarHeaderIndex > 0 &&
                                getDayDifference(
                                  t(
                                    `${sidebarHeaderKey}.Items.${sidebarLinkKey}.CreateAt`
                                  )
                                ) < 30
                              }
                            >
                              <Badge className="absolute top-0 right-0 -translate-y-2 translate-x-2 scale-[80%]">
                                {date("New")}
                              </Badge>
                            </Show.When>
                          </Show>
                        </Link>
                      )}
                    />
                  </Layout>
                </CollapsibleContent>
              </SidebarContent>
            </Collapsible>
          )}
        />
        <Collapsible>
          <SidebarContent>
            <CollapsibleTrigger
              disabled
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                }),
                "flex justify-between items-center w-full my-2"
              )}
            >
              <SidebarHeader>{t("Components.Name")}</SidebarHeader>
              <ChevronRight className="transition-transform duration-200" />
            </CollapsibleTrigger>
          </SidebarContent>
        </Collapsible>
        <Collapsible>
          <SidebarContent>
            <CollapsibleTrigger
              disabled
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                }),
                "flex justify-between items-center w-full my-2"
              )}
            >
              <SidebarHeader>{t("Animations.Name")}</SidebarHeader>
              <ChevronRight className="transition-transform duration-200" />
            </CollapsibleTrigger>
          </SidebarContent>
        </Collapsible>
      </Sidebar>
    </Layout>
  );
}
