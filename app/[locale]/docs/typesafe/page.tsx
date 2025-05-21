import type { JSX } from "react";
import type { Metadata } from "next";

// import PrevNextNav from "@/components/navigation/prev-next-nav";
import SectionNavigationList from "@/components/navigation/section_navigation/section-navigation-list";
import Layout from "@/components/layouts/layout";

type Params = Promise<{ locale: string }>;

export const metadata: Metadata = {
  title: "Typesafe",
  description:
    "Description of actions taken to secure the correct operation of the application.",
};

export default async function Page(props: {
  params: Params;
}): Promise<JSX.Element> {
  const { locale } = await props.params;

  const { default: Post } = await import(
    `@/public/content/${locale}/getting_started/typesafe.mdx`
  );

  return (
    <>
      <Layout type="mdx" id="typesafe">
        <Post />
        {/* <PrevNextNav /> */}
      </Layout>
      <Layout
        type="aside"
        className="hidden md:block fixed top-14 right-0 h-full w-1/5 p-4"
      >
        <SectionNavigationList sectionId="typesafe" />
      </Layout>
    </>
  );
}
