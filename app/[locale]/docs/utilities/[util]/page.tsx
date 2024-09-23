import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Heading from "@/components/docs/heading";
import Description from "@/components/docs/description";
import CodeBlock from "@/components/docs/code-block";
import List from "@/components/docs/list";
import Footer from "@/components/docs/footer";
import SectionNavigation from "@/components/navigation/section_navigation/section-navigation";
import { Layout } from "@/components/layouts/layout";
import Show from "@/components/utilities/conditional_rendering/show";
import { useTranslations } from "next-intl";
import { getFileData } from "@/actions/getFileData";
import { getPrevNextValue } from "@/lib/utils";
import { roughNotationColor } from "@/config/rought-notation-color";
import { keys as linkKeys } from "@/keys/sidebar-links-keys";
import { keys as categoryKeys } from "@/keys/links-keys";

const translation: string = "Data.Utilities.Items";
const sectionItemsTranslation: string = "Data.Utilities.SectionItems";

interface pageProps {
  params: {
    util: string;
  };
}

export default function Page({ params }: Readonly<pageProps>) {
  const t = useTranslations(`${translation}.${params.util}`);
  const sectionItems = useTranslations(sectionItemsTranslation);
  const footerItems = useTranslations("Data");

  const hook = getFileData(`./data/utilities/${params.util}/util.tsx`);
  const usage = getFileData(`./data/utilities/${params.util}/usage.txt`);

  const footerLinks = getPrevNextValue(params.util, linkKeys, categoryKeys);

  const generateSectionNavigationArray = (): string[] => {
    let array: string[] = ["Description", "Code"];

    if (t("Content.Parameters")) {
      array.push("Parameter");
    }
    if (t("Content.API")) {
      array.push("API");
    }

    return array;
  };

  return (
    <>
      <Heading title={t("Name")} color={roughNotationColor} />
      <ScrollArea
        className="block h-[calc(100vh-12rem)] pr-4 pb-4"
        aria-label="Main content area"
      >
        <Description description={t("Content.Description")} />
        <Separator className="my-5" aria-hidden="true" />
        <CodeBlock
          defaultValue="hook"
          triggers={[
            { value: "hook", title: sectionItems("Code.Hook") },
            { value: "usage", title: sectionItems("Code.Usage") },
          ]}
          contents={[
            { value: "hook", code: hook, ariaLabel: "Hook code scroll area" },
            {
              value: "usage",
              code: usage,
              ariaLabel: "Usage example scroll area",
            },
          ]}
        />
        <Separator className="my-5" aria-hidden="true" />
        <Show>
          <Show.When isTrue={!!t("Content.Parameters")}>
            <List
              id="parameter"
              name={sectionItems("Parameter.Name")}
              content={sectionItems("Parameter.Content")}
              ariaLabel="Hook parameters"
              contentList={t("Content.Parameters")}
            />
            <Separator className="my-5" aria-hidden="true" />
          </Show.When>
        </Show>
        <Show>
          <Show.When isTrue={!!t("Content.API")}>
            <List
              id="api"
              name="API"
              ariaLabel="API details"
              contentList={t("Content.API")}
            />
          </Show.When>
        </Show>
        <Separator className="my-5" aria-hidden="true" />
        <Footer
          data={[
            {
              link:
                footerItems(
                  `${footerLinks?.prevCategory}.Items.${footerLinks?.prev}.Link`
                ) || "",
              title: sectionItems("Footer.Previous"),
              description:
                footerItems(
                  `${footerLinks?.prevCategory}.Items.${footerLinks?.prev}.Name`
                ) || "",
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
      </ScrollArea>
      <Layout
        type="aside"
        className="hidden md:w-1/5 md:block fixed top-14 right-4 h-full p-4"
      >
        <SectionNavigation
          scrollItemsArray={generateSectionNavigationArray()}
          translation="Data.ScrollIntoViewItems"
        />
      </Layout>
    </>
  );
}
