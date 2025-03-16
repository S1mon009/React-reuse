import type { JSX } from "react";
import { useTranslations } from "next-intl";

import { Separator } from "@/components/ui/separator";
import Heading from "@/components/docs/heading/heading";
import Footer from "@/components/docs/footer/footer";
import SectionNavigationList from "@/components/navigation/section_navigation/section-navigation-list";
import Translation from "@/components/translation/translation";
import Layout from "@/components/layouts/layout";

import { getPrevNextValue } from "@/lib/utils";
import { roughNotationColor as color } from "@/config/rought-notation-color";

import { keys as linkKeys } from "@/keys/sidebar-links-keys";
import { keys as categoryKeys } from "@/keys/links-keys";

const translations: string = "Data.Docs.Items.introduction";
const sectionItemsTranslation: string = "Data.Hooks.SectionItems";

/**
 * Page component renders introduction info about library.
 * It supports localization (i18n) and is responsive for a11y improvements.
 *
 * @returns {JSX.Element} The rendered Page component.
 */
export default function Page(): JSX.Element {
  const t = useTranslations(translations);
  const footerItems = useTranslations("Data");
  const sectionItems = useTranslations(sectionItemsTranslation);
  const footerLinks = getPrevNextValue("introduction", linkKeys, categoryKeys);

  return (
    <>
      <Layout type="section">
        <Heading title={t("Name")} color={color} />
      </Layout>
      <Layout type="section" id="introduction">
        <Translation keyMessage="Data.Docs.Items.introduction.Content" />
      </Layout>
      <Separator className="my-4" />
      <Footer
        data={[
          {
            link: "",
            title: "",
            description: "",
          },
          {
            link:
              footerItems(
                `${footerLinks?.nextCategory}.Items.${footerLinks?.next}.Link`
              ) || "",
            title: sectionItems("Footer.Next"),
            description:
              footerItems(
                `${footerLinks?.nextCategory}.Items.${footerLinks?.next}.Name`
              ) || "",
          },
        ]}
      />
      <Layout
        type="aside"
        className="hidden md:block fixed top-14 right-0 h-full w-1/5 p-4"
      >
        <SectionNavigationList sectionId="introduction" />
      </Layout>
    </>
  );
}
