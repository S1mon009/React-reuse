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
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "@/components/navigation/navigation";
import { cn } from "@/lib/utils";
import { Each } from "@/components/utilities/each/each";
import Show from "@/components/utilities/conditional_rendering/show";
import { useTranslations } from "next-intl";
import { roughNotationColor } from "@/config/rought-notation-color";
import { keys } from "@/keys/sidebar-links-keys";

const translation: string = "LandingPage.Section2";

/**
 * Section 2 of the Landing Page.
 * Displays an article with a carousel and several cards that link to documentation pages.
 *
 * @returns {JSX.Element} The rendered Section2 component.
 */
export default function Section2() {
  const t = useTranslations(translation);

  return (
    <Layout
      type="section"
      className="flex justify-center gap-6 flex-wrap xl:h-[400px] p-6 md:p-12"
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
        className="w-full md:w-[800px] grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 gap-4"
      >
        <Each
          of={Array.from({ length: 4 })}
          render={(_, index: number) => (
            <Card className={index >= 2 ? "opacity-40" : ""}>
              <CardHeader className="pb-0">
                <CardTitle>{t(`Article2.Card${index}.Heading`)}</CardTitle>
                <CardDescription>
                  <Show>
                    <Show.When isTrue={index < 2}>
                      {t(`Article2.Card${index}.Description`)}
                    </Show.When>
                  </Show>
                </CardDescription>
              </CardHeader>
              <CardContent className="font-bold text-3xl py-3">
                <Show>
                  <Show.When isTrue={index < 2}>
                    {keys[index === 0 ? 1 : 2]?.length}{" "}
                    {t(`Article2.Card${index}.Content`)}
                  </Show.When>
                  <Show.Else>{t("CommingSoon")}</Show.Else>
                </Show>
              </CardContent>
              <CardFooter>
                <Show>
                  <Show.When isTrue={index < 2}>
                    <Link
                      href="/docs/hooks"
                      className={cn(
                        buttonVariants({ variant: "default", size: "sm" })
                      )}
                    >
                      {t("Button")}
                    </Link>
                  </Show.When>
                  <Show.Else>
                    <Button variant="default" size="sm" disabled>
                      {t("Button")}
                    </Button>
                  </Show.Else>
                </Show>
              </CardFooter>
            </Card>
          )}
        />
      </Layout>
    </Layout>
  );
}
