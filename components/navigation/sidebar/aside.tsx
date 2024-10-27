"use client";

import { useState } from "react";
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
import { cn } from "@/lib/utils";
import { Layout } from "@/components/layouts/layout";
import { Each } from "@/components/utilities/each/each";
import { Link } from "@/components/navigation/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "@/components/navigation/navigation";
import { ChevronRight } from "lucide-react";
import { keys as sidebarHeaderKeys } from "@/keys/sidebar-header-keys";
import { keys as sidebarLinksKeys } from "@/keys/sidebar-links-keys";

const translation: string = "Data";

export default function Aside(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean[]>([true, false, false]);
  const t = useTranslations(translation);
  const pathname = usePathname();

  const openCollapsible = (index: number) => {
    // Create a copy of the isOpen array
    const updatedIsOpen = [...isOpen];
    updatedIsOpen[index] = !updatedIsOpen[index];
    setIsOpen(updatedIsOpen); // Update the state with the new array
  };

  return (
    <Layout type="aside">
      <Sidebar>
        <Each
          of={sidebarHeaderKeys}
          render={(sidebarHeaderKey, sidebarHeaderIndex) => (
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
                        sidebarLinkKey: any,
                        sidebarLinkIndex: number
                      ) => {
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
                                className: "flex justify-start py-0",
                              }),
                              "relative transition-all duration-300 w-[calc(100%-40px)] ml-[30px] before:absolute before:content-[''] before:h-[calc(100%+10px)] before:w-[1px] before:bg-muted before:-left-[10px] hover:before:bg-foreground"
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
                          </Link>
                        );
                      }}
                    />
                  </Layout>
                </CollapsibleContent>
              </SidebarContent>
            </Collapsible>
          )}
        />
      </Sidebar>
    </Layout>
  );
}
