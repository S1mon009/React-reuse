import type { Metadata } from "next";
import { ScrollArea } from "@/components/ui/scroll-area";
import Aside from "@/components/navigation/sidebar/aside";
import { Layout } from "@/components/layouts/layout";
import BreadcrumbNavigation from "@/components/navigation/breadcrumb/breadcrumb";

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
export default function RootLayout({ children }: Readonly<rootLayoutProps>) {
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
