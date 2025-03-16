import type { JSX } from "react";
import { cn } from "@/lib/utils";

import { LayoutProps, LayoutItemsProps } from "./interface";

/**
 * This component wrap children into html main element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {LayoutItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered Main component
 */
const Main = ({ children, ...props }: LayoutItemsProps): JSX.Element => (
  <main {...props}>{children}</main>
);

/**
 * This component wrap children into html header element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {mainProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered Header component
 */
const Header = ({ children, ...props }: LayoutItemsProps): JSX.Element => (
  <header {...props}>{children}</header>
);

/**
 * This component wrap children into html nav element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {LayoutItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered Nav component
 */
const Nav = ({ children, ...props }: LayoutItemsProps): JSX.Element => (
  <nav {...props}>{children}</nav>
);

/**
 * This component wrap children into html div element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {LayoutItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered Div component
 */
const Div = ({ children, ...props }: LayoutItemsProps): JSX.Element => (
  <div {...props}>{children}</div>
);

/**
 * This component wrap children into html aside element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {LayoutItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered aside component
 */
const Aside = ({ children, ...props }: LayoutItemsProps): JSX.Element => (
  <aside {...props}>{children}</aside>
);

/**
 * This component wrap children into html section element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {LayoutItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered Section component
 */
const Section = ({ children, ...props }: LayoutItemsProps): JSX.Element => (
  <section {...props}>{children}</section>
);

/**
 * This component wrap children into html article element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {LayoutItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered Article component
 */
const Article = ({ children, ...props }: LayoutItemsProps): JSX.Element => (
  <article {...props}>{children}</article>
);

/**
 * This component wrap children into html footer element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {LayoutItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered Footer component
 */
const Footer = ({ children, ...props }: LayoutItemsProps): JSX.Element => (
  <footer {...props}>{children}</footer>
);

/**
 * This component wrap children into tailwind CSS prose element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {LayoutItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered Mdx component
 */
const Mdx = ({
  children,
  className,
  ...props
}: LayoutItemsProps): JSX.Element => (
  <article
    className={cn(
      "prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-5xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white",
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
