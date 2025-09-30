import type { JSX } from "react";
import type { Metadata } from "next";

// import PrevNextNav from "@/components/navigation/prev-next-nav";
import SectionNavigationList from "@/components/navigation/section_list/section-list";
import Layout from "@/components/layouts/layout";

type Params = Promise<{ locale: string }>;

export const metadata: Metadata = {
  title: "Quality",
  description:
    "Description of activities how the quality of the library code is maintained.",
};

export default async function Page(props: {
  params: Params;
}): Promise<JSX.Element> {
  const { locale } = await props.params;
  const { default: Post } = await import(
    `@/public/content/${locale}/getting_started/quality.mdx`
  );

  return (
    <>
      <Layout type="mdx" id="quality">
        <Post />
        {/* <PrevNextNav /> */}
      </Layout>
      <Layout
        type="aside"
        className="fixed right-0 top-14 hidden h-full w-1/5 p-4 md:block"
      >
        <SectionNavigationList sectionId="quality" />
      </Layout>
    </>
  );
}
