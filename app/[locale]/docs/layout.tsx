"use client";

import { useState, useEffect, Fragment } from "react";
import { use } from "react";

import { type JSX } from "react";
import type { Metadata } from "next";
import QueryProvider from "@/providers/query-provider";

import { ScrollArea } from "@/components/ui/scroll-area";
import ContentTree from "@/components/navigation/sidebar/content_tree/content-tree";
import BreadcrumbNavigation from "@/components/navigation/breadcrumb/breadcrumb";
import Layout from "@/components/layouts/layout";

import { getContentStructure } from "@/lib/file_structure/file-structure";

type Params = Promise<{ locale: string }>;

export default function RootLayout(props: {
  children: React.ReactNode;
  params: Params;
}): JSX.Element {
  const params = use(props.params);
  const locale = params.locale;
  const [structure, setStructure] = useState<any>({});
  useEffect(() => {
    const fetchStructure = async () => {
      const res = await fetch(`/api/get-folder-structure?locale=${locale}`);
      const { structure } = await res.json();
      setStructure(structure);
    };
    fetchStructure();
  }, [locale]);

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
        {/* <BreadcrumbNavigation structure={structure} /> */}
        <QueryProvider>
          <Layout type="main" className="w-full">
            {props.children}
          </Layout>
        </QueryProvider>
      </Layout>
    </Layout>
  );
}
