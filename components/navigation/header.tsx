import type { JSX } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/navigation/navigation";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { LanguageToggle } from "@/components/language/language-toggle";
import Links from "@/components/navigation/links/links";
import Command from "@/components/command/command";
import Typography from "@/components/typography/typography";
import Layout from "@/components/layouts/layout";
import { Github } from "lucide-react";

import Logo from "@/public/icon.svg";

interface HeaderNavigationProps {
  locale: string;
}

export default function HeaderNavigation({
  locale,
}: HeaderNavigationProps): JSX.Element {
  return (
    <Layout
      type="header"
      className="fixed top-0 left-0 flex items-center justify-between w-full h-16 p-3 border-b-muted border-b-2 bg-inherit z-[10]"
    >
      <Layout type="div" className="flex items-center h-full">
        <Links type="mobile" />
        <Link href="/" aria-label="Go to homepage">
          <Layout type="div" className="flex items-center">
            <Image src={Logo} alt="Reuse logo" className="size-10" priority />
            <Typography type="span" className="text-xl font-semibold">
              Reuse
            </Typography>
          </Layout>
        </Link>
      </Layout>
      <Links type="desktop" />
      <Layout type="div" className="flex gap-2">
        <Command />
        <a
          href="https://github.com/S1mon009/react-reuse"
          aria-label="GitHub repository"
        >
          <Button variant="outline" size="icon" aria-label="GitHub repository">
            <Github aria-hidden="true" focusable="false" />
          </Button>
        </a>
        <ModeToggle />
        <LanguageToggle />
      </Layout>
    </Layout>
  );
}
