import type { JSX } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/navigation/navigation";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { LanguageToggle } from "@/components/language/language-toggle";
import { Links } from "@/components/navigation";
import Command from "@/components/command/command";
import Typography from "@/components/typography/typography";
import Layout from "@/components/layouts/layout";
import { Github } from "lucide-react";

import Logo from "@/public/icon.svg";

export default function HeaderNavigation(): JSX.Element {
  return (
    <Layout
      type="header"
      className="fixed left-0 top-0 z-[10] flex h-16 w-full items-center justify-between border-b-2 border-b-muted bg-inherit p-3"
    >
      <Layout type="div" className="flex h-full items-center">
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
