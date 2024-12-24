import { Typography } from "@/components/typography/typography";
import { Layout } from "@/components/layouts/layout";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

interface TranslationProps {
  keyMessage: string;
}

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

  return (
    <>
      {t.rich(keyMessage, {
        h2: (chunks) => (
          <Typography type="h2" className="my-4">
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
      })}
    </>
  );
}
