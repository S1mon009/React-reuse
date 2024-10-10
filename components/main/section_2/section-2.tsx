import { Layout } from "@/components/layouts/layout";
import { Typography } from "@/components/typography/typography";
import { RoughNotation } from "react-rough-notation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Carousel from "@/components/main/section_2/carousel";
import { Link } from "@/components/navigation/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import SquareRepeat from "@/public/squere-repeat.svg";
import { roughNotationColor } from "@/config/rought-notation-color";
import { keys } from "@/keys/sidebar-links-keys";

const carouselArray = [keys[1].slice(0, 3), keys[2].slice(0, 3)];
const translation: string = "LandingPage.Section2";

export default function Section2() {
  const t = useTranslations(translation);

  return (
    <Layout
      type="section"
      className="flex justify-center gap-6 flex-wrap h-[400px] p-12"
    >
      <Layout type="article" className="w-full xl:w-[400px] text-xl">
        <Typography type="p" className="font-bold text-3xl mb-3">
          <RoughNotation type="highlight" color={roughNotationColor} show>
            {t("Article1.Heading")}
          </RoughNotation>
        </Typography>
        {t("Article1.Description")}
      </Layout>
      <Layout
        type="article"
        className="w-[800px] grid grid-cols-1 md:grid-cols-2 grid-rows-1 md:grid-rows-2 gap-4 mb-10"
      >
        <Card className="md:row-span-2">
          <Image
            src={SquareRepeat}
            alt="Square repeat image"
            className="absolute w-[20%] opacity-40"
          />
          <CardHeader>
            <CardTitle>{t("Article2.Card1.Heading")}</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <Carousel array={carouselArray} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>{t("Article2.Card2.Heading")}</CardTitle>
            <CardDescription>{t("Article2.Card2.Description")}</CardDescription>
          </CardHeader>
          <CardContent className="font-bold text-3xl py-3">
            {keys[1].length} {t("Article2.Card2.Content")}
          </CardContent>
          <CardFooter>
            <Link
              href="/docs/hooks"
              className={cn(buttonVariants({ variant: "default", size: "sm" }))}
            >
              {t("Button")}
            </Link>
          </CardFooter>
        </Card>
        <Card className="md:col-start-2">
          <CardHeader className="pb-0">
            <CardTitle>{t("Article2.Card3.Heading")}</CardTitle>
            <CardDescription>{t("Article2.Card3.Description")}</CardDescription>
          </CardHeader>
          <CardContent className="font-bold text-3xl py-3">
            {keys[2].length} {t("Article2.Card3.Content")}
          </CardContent>
          <CardFooter>
            <Link
              href="/docs/hooks"
              className={cn(buttonVariants({ variant: "default", size: "sm" }))}
            >
              {t("Button")}
            </Link>
          </CardFooter>
        </Card>
      </Layout>
    </Layout>
  );
}
