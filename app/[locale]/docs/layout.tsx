import { ScrollArea } from "@/components/ui/scroll-area";

import Aside from "@/components/navigation/sidebar/aside";
import Main from "@/components/layouts/main/main";
import BreadcrumbNavigation from "@/components/navigation/breadcrumb/breadcrumb";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <div className="hidden md:block w-72 h-full border-r-2 border-muted float-left">
        <ScrollArea className="w-full h-full">
          <Aside />
        </ScrollArea>
      </div>
      <div className="h-full float-left p-4">
        <BreadcrumbNavigation />
        <Main>{children}</Main>
      </div>
    </div>
  );
}
