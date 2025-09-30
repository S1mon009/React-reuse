import { use, type JSX } from "react";
import QueryProvider from "@/providers/query-provider";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Breadcrumb, ContentTree } from "@/components/navigation";
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
    <Layout type="div" className="overflow-x-hidden lg:flex lg:justify-center">
      <Layout
        type="div"
        className="fixed left-0 top-14 hidden h-full w-1/5 border-r-2 border-muted pt-4 lg:block"
      >
        <ScrollArea className="h-full w-full px-2 pb-14">
          <ContentTree locale={locale} />
        </ScrollArea>
      </Layout>
      <Layout type="div" className="h-full p-4 pt-20 md:w-4/5 lg:w-3/5">
        <Breadcrumb />
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
