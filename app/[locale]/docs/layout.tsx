import type { Metadata } from "next";
import { ScrollArea } from "@/components/ui/scroll-area";
import Aside from "@/components/navigation/sidebar/aside";
import { Layout } from "@/components/layouts/layout";
import BreadcrumbNavigation from "@/components/navigation/breadcrumb/breadcrumb";
import QueryProvider from "@/providers/query-provider";

export const metadata: Metadata = {
  icons: {
    icon: "../../icon.svg",
  },
};

interface rootLayoutProps {
  children: React.ReactNode;
}

/**
 * RootLayout component serves as the main layout for docs pages.
 * It includes a sidebar, breadcrumb navigation, and a content area for child components.
 *
 * Props:
 * - children (React.ReactNode): Layout children (readonly).
 *
 * @param {rootLayoutProps} props - Layout props.
 * @returns {JSX.Element} - The structured layout of the page.
 */
export default function RootLayout({
  children,
}: Readonly<rootLayoutProps>): JSX.Element {
  return (
    <Layout type="div" className="lg:flex lg:justify-center overflow-x-hidden">
      <Layout
        type="div"
        className="hidden lg:block fixed top-14 left-0 w-1/5 h-full border-r-2 border-muted pt-4"
      >
        <ScrollArea className="w-full h-full pb-14">
          <Aside />
        </ScrollArea>
      </Layout>
      <Layout type="div" className="h-full p-4 pt-20 md:w-4/5 lg:w-3/5">
        <BreadcrumbNavigation />
        <QueryProvider>
          <Layout type="main" className="w-full">
            {children}
          </Layout>
        </QueryProvider>
      </Layout>
    </Layout>
  );
}
