"use client";

import type { JSX } from "react";
import { Link } from "./navigation";
import Layout from "@/components/layouts/layout";
import Typography from "@/components/typography/typography";
import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer(): JSX.Element {
  const t = useTranslations("Footer");

  return (
    <Layout type="footer" className="mt-8">
      <Separator className="mb-8" />
      <Typography
        type="span"
        className="mb-8 flex items-center justify-center gap-1"
      >
        {t("CreatedWith")} <Heart className="text-primary" /> {t("By")}
        <Link
          href="https://github.com/S1mon009"
          className="underline decoration-solid"
        >
          S1mon009
        </Link>
      </Typography>
    </Layout>
  );
}
