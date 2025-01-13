import { Layout } from "@/components/layouts/layout";
import Heading from "@/components/docs/heading";
import Translation from "@/components/translation/translation";
import Footer from "@/components/docs/footer";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionNavigationList from "@/components/navigation/section_navigation/section-navigation-list";
import { getPrevNextValue } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { roughNotationColor as color } from "@/config/rought-notation-color";
import { keys as linkKeys } from "@/keys/sidebar-links-keys";
import { keys as categoryKeys } from "@/keys/links-keys";

const translations: string = "Data.Docs.Items.quality";
const sectionItemsTranslation: string = "Data.Hooks.SectionItems";

/**
 * Page component renders quality info about library.
 * It supports localization (i18n) and is responsive for a11y improvements.
 *
 * @returns {JSX.Element} The rendered Page component.
 */
export default function Page(): JSX.Element {
  const t = useTranslations(translations);
  const sectionItems = useTranslations(sectionItemsTranslation);
  const footerItems = useTranslations("Data");
  const footerLinks = getPrevNextValue("quality", linkKeys, categoryKeys);

  return (
    <>
      <Layout type="section">
        <Heading title={t("Name")} color={color} />
      </Layout>
      <Layout type="section" id="quality">
        <Translation keyMessage="Data.Docs.Items.quality.Content" />
      </Layout>
      <Separator className="my-4" />
      <Footer
        data={[
          {
            link: `${footerItems(
              `${footerLinks?.prevCategory}.Items.${footerLinks?.prev}.Link`
            )}`,
            title: sectionItems("Footer.Previous"),
            description: footerItems(
              `${footerLinks?.prevCategory}.Items.${footerLinks?.prev}.Name`
            ),
          },
          {
            link: `${footerItems(
              `${footerLinks?.nextCategory}.Items.${footerLinks?.next}.Link`
            )}`,
            title: sectionItems("Footer.Next"),
            description: footerItems(
              `${footerLinks?.nextCategory}.Items.${footerLinks?.next}.Name`
            ),
          },
        ]}
      />
      <Layout
        type="aside"
        className="hidden md:block fixed top-14 right-0 h-full w-1/5 p-4"
      >
        <SectionNavigationList sectionId="quality" />
      </Layout>
    </>
  );
}
