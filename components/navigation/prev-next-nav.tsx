"use client";

import { useState, useEffect, type JSX } from "react";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

import { Link } from "@/components/navigation/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Show from "@/components/utilities/show/show";
import Layout from "@/components/layouts/layout";
import Typography from "@/components/typography/typography";

import { FileMetadata } from "@/lib/file_structure/interface";

export default function PrevNextNav(): JSX.Element {
  const [prevNextLinks, setPrevNextLinks] = useState<{
    prev: FileMetadata | null;
    next: FileMetadata | null;
  }>({
    prev: null,
    next: null,
  });
  const t = useTranslations("System.Navigation");
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    const fetchLinks = async () => {
      const res = await fetch(
        `/api/prev-next-links?locale=pl&path=/pl/docs/getting_started`,
      );
      console.log("res", res);
      const { prev, next } = await res.json();
      setPrevNextLinks({ prev, next });
    };

    fetchLinks();
  }, [pathname, locale]);

  return (
    <Layout
      type="nav"
      className="mt-8 flex w-full flex-wrap justify-between gap-2"
    >
      <Show>
        <Show.When isTrue={prevNextLinks?.prev != null}>
          <Link
            href={String(prevNextLinks?.prev?.link)}
            className="w-full md:w-[40%] lg:w-2/5"
          >
            <Card className="flex cursor-pointer border-muted hover:border-primary">
              <CardHeader className="p-3 pt-0">
                <CardDescription className="mb-0">
                  <Typography type="span" className="text-muted-foreground">
                    {t("Prev")}
                  </Typography>
                </CardDescription>
                <CardTitle>{prevNextLinks?.prev?.name}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        </Show.When>
        <Show.Else>
          <div />
        </Show.Else>
      </Show>
      <Show>
        <Show.When isTrue={prevNextLinks?.next != null}>
          <Link
            href={String(prevNextLinks?.next?.link)}
            className="w-full md:w-[40%] lg:w-2/5"
          >
            <Card className="flex cursor-pointer flex-wrap justify-end border-muted hover:border-primary">
              <CardHeader className="p-3 pt-0">
                <CardDescription dir="rtl" className="mb-0">
                  <Typography type="span" className="text-muted-foreground">
                    {t("Next")}
                  </Typography>
                </CardDescription>
                <CardTitle>{prevNextLinks?.next?.name}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        </Show.When>
        <Show.Else>
          <div />
        </Show.Else>
      </Show>
    </Layout>
  );
}
