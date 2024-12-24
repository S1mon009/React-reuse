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

const translations: string = "Data.Docs.Items.typesafe";
const sectionItemsTranslation: string = "Data.Hooks.SectionItems";

/**
 * Page component renders typesafe info about library.
 * It supports localization (i18n) and is responsive for a11y improvements.
 *
 * @returns {JSX.Element} The rendered Page component.
 */
export default function Page(): JSX.Element {
  const t = useTranslations(translations);
  const sectionItems = useTranslations(sectionItemsTranslation);
  const footerItems = useTranslations("Data");
  const footerLinks = getPrevNextValue("typesafe", linkKeys, categoryKeys);

  return (
    <>
      <Layout type="section">
        <Heading title={t("Name")} color={color} />
      </Layout>
      <ScrollArea
        className="block h-[calc(100vh-12rem)] pr-4 pb-8"
        aria-label="Main content area"
      >
        <Layout type="section" id="typesafe">
          <Translation keyMessage={"Data.Docs.Items.typesafe.Content"} />
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
      </ScrollArea>
      <Layout
        type="aside"
        className="hidden md:w-1/5 md:block fixed top-14 right-4 h-full p-4"
      >
        <SectionNavigationList sectionId="typesafe" />
      </Layout>
    </>
  );
}
