"use client";

import type { JSX } from "react";

import { useTranslations } from "use-intl";

import Typography from "@/components/typography/typography";

const translation: string = "System.Code";

export default function CodeHeading(): JSX.Element {
  const t = useTranslations(translation);

  return (
    <Typography type="h2" className="hidden">
      {t("Header")}
    </Typography>
  );
}
