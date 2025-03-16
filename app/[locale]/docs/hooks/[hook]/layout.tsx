import { use, type JSX } from "react";
import { useTranslations } from "next-intl";

import { Separator } from "@/components/ui/separator";
import Heading from "@/components/docs/heading/heading";
import Footer from "@/components/docs/footer/footer";
import SectionNavigationList from "@/components/navigation/section_navigation/section-navigation-list";
import Translation from "@/components/translation/translation";
import Layout from "@/components/layouts/layout";

import { getPrevNextValue } from "@/lib/utils";
import { roughNotationColor } from "@/config/rought-notation-color";

import { keys as linkKeys } from "@/keys/sidebar-links-keys";
import { keys as categoryKeys } from "@/keys/links-keys";

const translation: string = "Data.Hooks.Items";
const sectionItemsTranslation: string = "Data.Hooks.SectionItems";

type Params = Promise<{ locale: string; hook: string }>;

export default function RootLayout(props: {
  children: Readonly<React.ReactNode>;
  params: Params;
}) {
  const params = use(props.params);
  const { locale, hook } = params;

  return (
    <>
      <Heading title={hook} color={roughNotationColor} />
      {props.children}
    </>
  );
}
