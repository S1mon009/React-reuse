import { use, type JSX } from "react";
import Layout from "@/components/layouts/layout";

type Params = Promise<{ locale: string; hook: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const hook = params.hook;
  const locale = params.locale;
}

/**
 * Page component renders details for a specific hook, including hook code, usage example,
 * and additional parameters. It supports localization (i18n) and is responsive for a11y improvements.
 *
 * Props:
 * - params (object):
 *  - hook (string): The hook name.
 *
 * @param {pageProps} props - Contains the params object.
 * @returns {JSX.Element} The rendered Page component.
 */
export default async function Page(props: { params: Params }) {
  const { hook, locale } = await props.params;

  const { default: Post, name } = await import(
    `@/content/${locale}/hooks/${hook}.mdx`
  );

  return (
    <Layout type="mdx">
      <Post />
    </Layout>
  );
}
