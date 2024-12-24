import { Layout } from "@/components/layouts/layout";
import Section1 from "@/components/main/section_1/section-1";
import Section2 from "@/components/main/section_2/section-2";
import Section3 from "@/components/main/section_3/section-3";

/**
 * Page component renders landing page.
 * It supports localization (i18n) and is responsive for a11y improvements.
 *
 * @returns {JSX.Element} The rendered Page component.
 */
export default function Page(): JSX.Element {
  return (
    <Layout type="main" className="absolute w-full h-72 md:h-full z-0">
      <Section1 />
      <Section2 />
      <Section3 />
    </Layout>
  );
}
