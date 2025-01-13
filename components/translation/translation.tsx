"use client";

import { Typography } from "@/components/typography/typography";
import { Separator } from "@/components/ui/separator";
import CodeBlock from "@/components/docs/code-block";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

interface TranslationProps {
  keyMessage: string;
}

const tabsTranslation: string = "Data";

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
  const tabs = useTranslations(tabsTranslation);
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
        code: (chunks: any) => {
          console.log(chunks[0]);
          return (
            <CodeBlock
              defaultValue={chunks[0] === "hook" ? "hook" : "util"}
              triggers={[
                {
                  value: chunks[0] === "hook" ? "hook" : "util",
                  title: tabs(
                    `${
                      chunks[0] === "hook" ? "Hooks" : "Utilities"
                    }.SectionItems.Code.${
                      chunks[0] === "hook" ? "Hook" : "Util"
                    }`
                  ),
                },
                {
                  value: "usage",
                  title: tabs(
                    `${
                      chunks[0] === "hook" ? "Hooks" : "Utilities"
                    }.SectionItems.Code.Usage`
                  ),
                },
              ]}
              contents={[
                {
                  value: chunks[0] === "hook" ? "hook" : "util",
                  code: chunks[0] === "hook" ? hook : util,
                  ariaLabel: `${
                    chunks[0] === "hook" ? "Hook" : "Util"
                  } code scroll area`,
                },
                {
                  value: "usage",
                  code: chunks[0] === "hook" ? hookUsage : utilUsage,
                  ariaLabel: "Usage example scroll area",
                },
              ]}
            />
          );
        },
      })}
    </>
  );
}
