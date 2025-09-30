import type { JSX } from "react";
import { useTranslations } from "next-intl";

import { Separator } from "@/components/ui/separator";
import { Compare } from "@/components/ui/compare";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RoughNotation } from "react-rough-notation";
import Each from "@/components/utilities/each/each";
import Typography from "@/components/typography/typography";
import Layout from "@/components/layouts/layout";

import { roughNotationColor } from "@/config/rought-notation-color";

import Image1 from "@/public/code1.png";
import Image2 from "@/public/code2.png";

const translation: string = "LandingPage.Section3";

export default function Section3(): JSX.Element {
  const t = useTranslations(translation);

  return (
    <Layout
      type="section"
      className="flex flex-wrap-reverse justify-around gap-6 p-6 md:p-12 xl:mt-52 xl:h-[400px]"
    >
      <Layout type="article">
        <div className="rounded-3xl border border-neutral-200 bg-neutral-100 p-4 px-4 dark:border-neutral-800 dark:bg-neutral-900">
          <Compare
            firstImage={Image1}
            secondImage={Image2}
            firstImageClassName="object-cover object-left-top"
            secondImageClassname="object-cover object-left-top"
            className="w-[calc(100vw-6rem)] sm:h-[300px] sm:w-[600px]"
            slideMode="hover"
          />
        </div>
      </Layout>
      <Layout type="article" className="w-full text-xl xl:w-[500px]">
        <Typography type="p" className="mb-3 text-3xl font-bold">
          <RoughNotation type="highlight" color={roughNotationColor} show>
            {t("Heading")}
          </RoughNotation>
        </Typography>
        {t("Description")}
        <Separator className="mt-4" />
        <Accordion type="single" collapsible className="w-full">
          <Each
            of={Array.from({ length: 4 })}
            render={(_, index: number) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>
                  {t(`Accordions.Accordion${index}.Title`)}
                </AccordionTrigger>
                <AccordionContent>
                  {t(`Accordions.Accordion${index}.Content`)}
                </AccordionContent>
              </AccordionItem>
            )}
          />
        </Accordion>
      </Layout>
    </Layout>
  );
}
