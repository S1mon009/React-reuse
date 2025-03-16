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

/**
 * Section 23 of the Landing Page.
 * Displays an article with a image compare and several accordions.
 *
 * @returns {JSX.Element} The rendered Section3 component.
 */
export default function Section3(): JSX.Element {
  const t = useTranslations(translation);

  return (
    <Layout
      type="section"
      className="flex justify-around gap-6 flex-wrap-reverse xl:h-[400px] xl:mt-52 p-6 md:p-12"
    >
      <Layout type="article">
        <div className="p-4 border rounded-3xl dark:bg-neutral-900 bg-neutral-100  border-neutral-200 dark:border-neutral-800 px-4">
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
      <Layout type="article" className="w-full xl:w-[500px] text-xl">
        <Typography type="p" className="font-bold text-3xl mb-3">
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
