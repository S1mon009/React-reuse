import { headers } from "next/headers";

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

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const fullUrl = headersList.get("referer") || "";
  const t = useTranslations("Data");

  return (
    <div className="h-[calc(100vh-4rem)]">
      <div className="w-72 h-full border-r-2 border-muted float-left">
        <ScrollArea className="w-full h-full">
          <Sidebar className="w-full p-4">
            <Each
              of={sidebarHeaderKeys}
              render={(sidebarHeaderKey, sidebarHeaderIndex) => {
                return (
                  <SidebarContent key={sidebarHeaderIndex}>
                    <SidebarHeader>
                      {t(`${sidebarHeaderKey}.Title`)}
                    </SidebarHeader>
                    <div className="flex flex-wrap gap-2 pl-2">
                      <Each
                        of={sidebarLinksKeys[sidebarHeaderIndex]}
                        render={(sidebarLinksKey, sidebarLinksIndex) => {
                          console.log(fullUrl.split("/").slice(-1)[0]);
                          return (
                            <Link
                              href={`/docs/${
                                sidebarHeaderIndex === 0
                                  ? sidebarLinksKey
                                  : `${t(
                                      `${sidebarHeaderKey}.Link`
                                    )}/${sidebarLinksKey}`
                              }`}
                              className={cn(
                                buttonVariants({
                                  variant:
                                    fullUrl.split("/").slice(-1)[0] ===
                                    sidebarLinksKey
                                      ? "secondary"
                                      : "ghost",
                                  size: "sm",
                                  className: "flex justify-start",
                                }),
                                "w-full"
                              )}
                              key={sidebarLinksIndex}
                            >
                              {t(
                                `${sidebarHeaderKey}.Items.${sidebarLinksKey}.Name`
                              )}
                            </Link>
                          );
                        }}
                      />
                    </div>
                  </SidebarContent>
                );
              }}
            />
          </Sidebar>
        </ScrollArea>
      </div>
      <div className="h-full float-left">{children}</div>
    </div>
  );
}
