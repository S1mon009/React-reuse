import { ScrollArea } from "@/components/ui/scroll-area";
import Aside from "@/components/navigation/sidebar/aside";
import { Layout } from "@/components/layouts/layout";
import BreadcrumbNavigation from "@/components/navigation/breadcrumb/breadcrumb";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout type="div" className="h-[calc(100vh-4rem)]">
      <Layout
        type="div"
        className="hidden lg:block w-1/5 h-full border-r-2 border-muted float-left"
      >
        <ScrollArea className="w-full h-full">
          <Aside />
        </ScrollArea>
      </Layout>
      <Layout type="div" className="h-full lg:w-3/5 md:w-4/5 float-left p-4">
        <BreadcrumbNavigation />
        <Layout type="main" className="w-full">
          {children}
        </Layout>
      </Layout>
    </Layout>
  );
}
