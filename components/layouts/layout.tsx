interface layoutProps extends React.HTMLAttributes<HTMLElement> {
  type:
    | "main"
    | "header"
    | "nav"
    | "div"
    | "aside"
    | "section"
    | "article"
    | "footer";
  children: Readonly<React.ReactNode>;
}
interface layoutItemsProps extends React.HTMLAttributes<HTMLElement> {
  children: Readonly<React.ReactNode>;
}

/**
 * This component wrap children into html main element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {layoutItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered Main component
 */
const Main = ({ children, ...props }: layoutItemsProps): JSX.Element => (
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
const Header = ({ children, ...props }: layoutItemsProps): JSX.Element => (
  <header {...props}>{children}</header>
);

/**
 * This component wrap children into html nav element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {layoutItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered Nav component
 */
const Nav = ({ children, ...props }: layoutItemsProps): JSX.Element => (
  <nav {...props}>{children}</nav>
);

/**
 * This component wrap children into html div element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {layoutItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered Div component
 */
const Div = ({ children, ...props }: layoutItemsProps): JSX.Element => (
  <div {...props}>{children}</div>
);

/**
 * This component wrap children into html aside element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {layoutItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered aside component
 */
const Aside = ({ children, ...props }: layoutItemsProps): JSX.Element => (
  <aside {...props}>{children}</aside>
);

/**
 * This component wrap children into html section element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {layoutItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered Section component
 */
const Section = ({ children, ...props }: layoutItemsProps): JSX.Element => (
  <section {...props}>{children}</section>
);

/**
 * This component wrap children into html article element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {layoutItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered Article component
 */
const Article = ({ children, ...props }: layoutItemsProps): JSX.Element => (
  <article {...props}>{children}</article>
);

/**
 * This component wrap children into html footer element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {layoutItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered Footer component
 */
const Footer = ({ children, ...props }: layoutItemsProps): JSX.Element => (
  <footer {...props}>{children}</footer>
);

const layoutsMap: Map<string, React.ComponentType<layoutItemsProps>> = new Map([
  ["main", Main],
  ["header", Header],
  ["nav", Nav],
  ["div", Div],
  ["aside", Aside],
  ["section", Section],
  ["article", Article],
  ["footer", Footer],
]);

export function Layout({ type, children, ...props }: layoutProps): JSX.Element {
  const SelectedLayout = layoutsMap.get(type);

  return SelectedLayout ? (
    <SelectedLayout {...props}>{children}</SelectedLayout>
  ) : (
    <div {...props}>{children}</div>
  );
}
