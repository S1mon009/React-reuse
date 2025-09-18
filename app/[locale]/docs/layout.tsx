import { use, type JSX } from "react";
import QueryProvider from "@/providers/query-provider";

import { ScrollArea } from "@/components/ui/scroll-area";
import ContentTree from "@/components/navigation/sidebar/content_tree/content-tree";
import BreadcrumbNavigation from "@/components/navigation/breadcrumb/breadcrumb";
import Footer from "@/components/navigation/footer";
import Layout from "@/components/layouts/layout";

type Params = Promise<{ locale: string }>;

export default function RootLayout(props: {
  children: React.ReactNode;
  params: Params;
}): JSX.Element {
  const params = use(props.params);
  const locale = params.locale;

  return (
    <Layout type="div" className="lg:flex lg:justify-center overflow-x-hidden">
      <Layout
        type="div"
        className="hidden lg:block fixed top-14 left-0 w-1/5 h-full border-r-2 border-muted pt-4"
      >
        <ScrollArea className="w-full h-full pb-14 px-2">
          <ContentTree locale={locale} />
        </ScrollArea>
      </Layout>
      <Layout type="div" className="h-full p-4 pt-20 md:w-4/5 lg:w-3/5">
        <BreadcrumbNavigation />
        <QueryProvider>
          <Layout type="main" className="w-full">
            {props.children}
            <Footer />
          </Layout>
        </QueryProvider>
      </Layout>
    </Layout>
  );
}
