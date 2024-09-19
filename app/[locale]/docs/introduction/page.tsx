import { Fragment } from "react";
import { Layout } from "@/components/layouts/layout";
import { Typography } from "@/components/typography/typography";
import Heading from "@/components/docs/heading";
import SectionNavigation from "@/components/navigation/section_navigation/section-navigation";
import Footer from "@/components/docs/footer";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Each } from "@/components/utilities/each/each";
import Show from "@/components/utilities/conditional_rendering/show";
import { useTranslations } from "next-intl";
import { getPrevNextValue } from "@/lib/utils";
import { roughNotationColor as color } from "@/config/rought-notation-color";
import { keys as linkKeys } from "@/keys/sidebar-links-keys";
import { keys as categoryKeys } from "@/keys/links-keys";

const translations: string = "Data.Docs.Items.introduction";
const sectionItemsTranslation: string = "Data.Hooks.SectionItems";
const keys: string[] = ["Entry", "Testing", "TypeScript", "Linting"];

export default function Page() {
  const t = useTranslations(translations);
  const footerItems = useTranslations("Data");
  const sectionItems = useTranslations(sectionItemsTranslation);
  const footerLinks = getPrevNextValue("introduction", linkKeys, categoryKeys);

  return (
    <>
      <Layout type="section" id="introduction">
        <Heading title={t("Name")} color={color} />
      </Layout>
      <ScrollArea
        className="block h-[calc(100vh-12rem)] pr-4 pb-4"
        aria-label="Main content area"
      >
        <Layout type="section">
          <Each
            of={keys}
            render={(item, index: number) => {
              return (
                <Fragment key={index}>
                  <Layout type="article" id={`${item.toLowerCase()}`}>
                    <Show>
                      <Show.When isTrue={index > 0}>
                        <Typography type="h3" className="my-4">
                          {t(`Content.${item}.Title`)}
                        </Typography>
                      </Show.When>
                    </Show>
                    <Each
                      of={t(`Content.${item}.Content`).split("&")}
                      render={(section, sectionIndex: number) => (
                        <Typography
                          type="p"
                          className="my-2"
                          key={sectionIndex}
                        >
                          {section}
                        </Typography>
                      )}
                    />
                  </Layout>
                  <Separator className="mt-4" />
                </Fragment>
              );
            }}
          />
        </Layout>
        <Layout type="section" className="my-4" id="summary">
          {t("Content.Summary")}
        </Layout>
        <Separator className="my-4" />
        <Footer
          data={[
            {
              link:
                `${footerItems(
                  `${footerLinks?.prevCategory}.Items.${footerLinks?.prev}.Link`
                )}` && "",
              title: sectionItems("Footer.Previous"),
              description:
                footerItems(
                  `${footerLinks?.prevCategory}.Items.${footerLinks?.prev}.Name`
                ) && "",
            },
            {
              link:
                `${footerItems(
                  `${footerLinks?.nextCategory}.Items.${footerLinks?.next}.Link`
                )}` || "",
              title: sectionItems("Footer.Next") || "",
              description:
                footerItems(
                  `${footerLinks?.nextCategory}.Items.${footerLinks?.next}.Name`
                ) || "",
            },
          ]}
        />
      </ScrollArea>
      <Layout
        type="aside"
        className="hidden md:w-1/5 md:block fixed top-14 right-4 h-full p-4"
      >
        <SectionNavigation
          scrollItemsArray={["Entry", "Testing", "TypeScript", "Linting"]}
          translation="Data.Docs.ScrollIntoViewItems"
        />
      </Layout>
    </>
  );
}
