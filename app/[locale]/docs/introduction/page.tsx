import type { JSX } from "react";
import type { Metadata } from "next";

import PrevNextNav from "@/components/navigation/prev-next-nav";
import SectionNavigationList from "@/components/navigation/section_navigation/section-navigation-list";
import Layout from "@/components/layouts/layout";

type Params = Promise<{ locale: string }>;

export const metadata: Metadata = {
  title: "Introduction",
  description: "Introduction to the documentation",
};

export default async function Page(props: {
  params: Params;
}): Promise<JSX.Element> {
  const { locale } = await props.params;

  const { default: Post } = await import(
    `@/public/content/${locale}/getting_started/introduction.mdx`
  );

  return (
    <>
      <Layout type="mdx" id="introduction">
        <Post />
        {/* <PrevNextNav /> */}
      </Layout>
      <Layout
        type="aside"
        className="hidden md:block fixed top-14 right-0 h-full w-1/5 p-4"
      >
        <SectionNavigationList sectionId="introduction" />
      </Layout>
    </>
  );
}
