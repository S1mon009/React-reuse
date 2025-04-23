import type { JSX } from "react";
import { cn } from "@/lib/utils";

import { LayoutProps, LayoutItemsProps } from "./interface";

const Main = ({ children, ...props }: LayoutItemsProps): JSX.Element => (
  <main {...props}>{children}</main>
);

const Header = ({ children, ...props }: LayoutItemsProps): JSX.Element => (
  <header {...props}>{children}</header>
);

const Nav = ({ children, ...props }: LayoutItemsProps): JSX.Element => (
  <nav {...props}>{children}</nav>
);

const Div = ({ children, ...props }: LayoutItemsProps): JSX.Element => (
  <div {...props}>{children}</div>
);

const Aside = ({ children, ...props }: LayoutItemsProps): JSX.Element => (
  <aside {...props}>{children}</aside>
);

const Section = ({ children, ...props }: LayoutItemsProps): JSX.Element => (
  <section {...props}>{children}</section>
);

const Article = ({ children, ...props }: LayoutItemsProps): JSX.Element => (
  <article {...props}>{children}</article>
);

const Footer = ({ children, ...props }: LayoutItemsProps): JSX.Element => (
  <footer {...props}>{children}</footer>
);

const Mdx = ({
  children,
  className,
  ...props
}: LayoutItemsProps): JSX.Element => (
  <article
    className={cn(
      "prose prose-h1:text-5xl prose-h1:font-extrabold prose-h1:tracking-tight prose-h1:lg:text-6xl prose-h2:text-4xl prose-h2:scroll-m-20 prose-h2:border-b prose-h2:font-semibold prose-h2:tracking-tight prose-h2:first:mt-0 prose-h2:first:pt-0 prose-h2:pt-4 prose-h2:mb-3 prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-code:p-1 prose-code:bg-muted prose-code:rounded-md prose-code:before:hidden prose-code:after:hidden dark:prose-strong:text-primary-foreground dark:prose-p:text-primary-foreground dark:prose-code:text-primary dark:prose-li:text-primary-foreground dark:prose-headings:text-primary-foreground max-w-full",
      className
    )}
    {...props}
  >
    {children}
  </article>
);

const layoutsMap: Map<string, React.ComponentType<LayoutItemsProps>> = new Map([
  ["main", Main],
  ["header", Header],
  ["nav", Nav],
  ["div", Div],
  ["aside", Aside],
  ["section", Section],
  ["article", Article],
  ["footer", Footer],
  ["mdx", Mdx],
]);

export default function Layout({
  type,
  children,
  ...props
}: LayoutProps): JSX.Element {
  const SelectedLayout = layoutsMap.get(type);

  return SelectedLayout ? (
    <SelectedLayout {...props}>{children}</SelectedLayout>
  ) : (
    <div {...props}>{children}</div>
  );
}
