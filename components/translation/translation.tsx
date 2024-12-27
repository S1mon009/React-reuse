"use client";

import { Typography } from "@/components/typography/typography";
import { Separator } from "@/components/ui/separator";
import CodeBlock from "@/components/docs/code-block";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

interface TranslationProps {
  keyMessage: string;
}

const hooksTabsTranslation: string = "Data.Hooks.SectionItems";

/**
 * Translation component allows to dynamicly render html elements
 * with internalization.
 *
 * Props:
 * - keyMessage (string): The message key.
 *
 * @param {TranslationProps} props
 * @returns {JSX.Element} The rendered Translation component.
 */
export default function Translation({
  keyMessage,
}: TranslationProps): JSX.Element {
  const t = useTranslations();
  const hooksTabs = useTranslations(hooksTabsTranslation);
  const params = useParams();
  const hook: string = `/data/hooks/${params.hook}/hook.ts`;
  const hookUsage: string = `/data/hooks/${params.hook}/usage.txt`;
  const util: string = `/data/utilities/${params.util}/util.tsx`;
  const utilUsage: string = `/data/utilities/${params.util}/usage.txt`;

  return (
    <>
      {t.rich(keyMessage, {
        h2: (chunks) => (
          <Typography type="h2" className="my-4">
            {chunks}
          </Typography>
        ),
        h2hide: (chunks) => (
          <Typography type="h2" className="my-4 hidden">
            {chunks}
          </Typography>
        ),
        h3: (chunks) => (
          <Typography type="h3" className="my-4">
            {chunks}
          </Typography>
        ),
        h5: (chunks) => (
          <Typography type="h5" className="my-4">
            {chunks}
          </Typography>
        ),
        p: (chunks) => (
          <Typography type="p" className="my-2">
            {chunks}
          </Typography>
        ),
        ul: (chunks) => <ul className="w-full my-4 list-disc">{chunks}</ul>,
        ol: (chunks) => <ol className="w-full my-4 list-decimal">{chunks}</ol>,
        li: (chunks) => <li className="w-full my-1 ml-6">{chunks}</li>,
        bold: (chunks) => <span className="font-semibold">{chunks}</span>,
        separator: () => <Separator className="my-4" />,
        br: () => <br />,
        secondaryhighlight: (chunks) => (
          <Typography type="code">{chunks}</Typography>
        ),
        code: (chunks) => (
          <CodeBlock
            defaultValue={chunks === "hook" ? "hook" : "util"}
            triggers={[
              {
                value: chunks === "hook" ? "hook" : "util",
                title: hooksTabs(`Code.${chunks === "hook" ? "Util" : "Hook"}`),
              },
              { value: "usage", title: hooksTabs("Code.Usage") },
            ]}
            contents={[
              {
                value: chunks === "hook" ? "hook" : "util",
                code: chunks === "hook" ? util : hook,
                ariaLabel: `${
                  chunks === "hook" ? "Hook" : "Util"
                } code scroll area`,
              },
              {
                value: "usage",
                code: chunks === "hook" ? utilUsage : hookUsage,
                ariaLabel: "Usage example scroll area",
              },
            ]}
          />
        ),
      })}
    </>
  );
}
