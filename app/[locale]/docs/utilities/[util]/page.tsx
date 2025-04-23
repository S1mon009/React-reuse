import { type JSX } from "react";
import type { Metadata } from "next";

import PrevNextNav from "@/components/navigation/prev-next-nav";
import SectionNavigationList from "@/components/navigation/section_navigation/section-navigation-list";
import Layout from "@/components/layouts/layout";

type Params = Promise<{ locale: string; util: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { util, locale } = await props.params;

  const { name, description } = await import(
    `@/content/${locale}/utilities/${util}.mdx`
  );

  return {
    title: name,
    description,
  };
}

export default async function Page(props: {
  params: Params;
}): Promise<JSX.Element> {
  const { util, locale } = await props.params;

  const { default: Post } = await import(
    `@/content/${locale}/utilities/${util}.mdx`
  );

  return (
    <>
      <Layout type="mdx" id={util}>
        <Post />
        <PrevNextNav />
      </Layout>
      <Layout
        type="aside"
        className="hidden md:block fixed top-14 right-0 h-full w-1/5 p-4"
      >
        <SectionNavigationList sectionId={util} />
      </Layout>
    </>
  );
}
