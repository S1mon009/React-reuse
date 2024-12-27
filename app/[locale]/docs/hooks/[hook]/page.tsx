import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Heading from "@/components/docs/heading";
import Footer from "@/components/docs/footer";
import SectionNavigationList from "@/components/navigation/section_navigation/section-navigation-list";
import Translation from "@/components/translation/translation";
import { Layout } from "@/components/layouts/layout";
import { useTranslations } from "next-intl";
import { getPrevNextValue } from "@/lib/utils";
import { roughNotationColor } from "@/config/rought-notation-color";
import { keys as linkKeys } from "@/keys/sidebar-links-keys";
import { keys as categoryKeys } from "@/keys/links-keys";

const translation: string = "Data.Hooks.Items";
const sectionItemsTranslation: string = "Data.Hooks.SectionItems";

interface pageProps {
  params: {
    hook: string;
  };
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
export default function Page({ params }: Readonly<pageProps>): JSX.Element {
  const t = useTranslations(`${translation}.${params.hook}`);
  const sectionItems = useTranslations(sectionItemsTranslation);
  const footerItems = useTranslations("Data");

  const footerLinks = getPrevNextValue(params.hook, linkKeys, categoryKeys);

  return (
    <>
      <Heading title={t("Name")} color={roughNotationColor} />

      <ScrollArea
        className="block h-[calc(100vh-12rem)] md:pr-4 pb-8"
        aria-label="Main content area"
      >
        <Layout type="section" id={params.hook}>
          <Translation keyMessage={`${translation}.${params.hook}.Content`} />
        </Layout>
        <Separator className="my-5" aria-hidden="true" />
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
        <SectionNavigationList sectionId={params.hook} />
      </Layout>
    </>
  );
}
