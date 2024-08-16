import Image from "next/image";

import { Link } from "@/components/navigation/navigation";

import { Button } from "@/components/ui/button";

import Links from "@/components/navigation/links/links";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { LanguageToggle } from "@/components/language/language-toggle";

import { Github } from "lucide-react";

import Logo from "@/public/icon.svg";

import { keys as linkKeys } from "@/config/links-keys";

/**
 * Header component renders a header element for the application.
 *
 * This component is responsible for rendering the main navigation header, including:
 * - A logo with a link to the homepage.
 * - Navigation links for both mobile and desktop layouts.
 * - External links to GitHub and other toggle controls for theme and language.
 *
 * @returns {JSX.Element} The rendered header component.
 */
export default function Header(): JSX.Element {
  return (
    <header className="fixed top-0 left-0 flex items-center justify-between w-full h-16 p-3 border-b-muted border-b-2 bg-inherit">
      <div className="flex items-center h-full">
        <Links keys={linkKeys} links="Header.Links" type="mobile" />
        <Link href="/">
          <div className="flex items-center">
            <Image src={Logo} alt="Reuse logo" className="size-10" priority />
            <span className="text-xl font-semibold">Reuse</span>
          </div>
        </Link>
      </div>
      <Links keys={linkKeys} links="Header.Links" type="desktop" />
      <div className="flex gap-2">
        <a href="https://github.com/S1mon009/react-reuse">
          <Button variant="outline" size="icon">
            <Github />
          </Button>
        </a>
        <ModeToggle />
        <LanguageToggle />
      </div>
    </header>
  );
}
