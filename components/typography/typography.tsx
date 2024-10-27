import { cn } from "@/lib/utils";

interface typographyProps extends React.HTMLAttributes<HTMLElement> {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "a" | "code";
  children: Readonly<React.ReactNode>;
  href?: string;
}
interface typographyItemsProps extends React.HTMLAttributes<HTMLElement> {
  children: Readonly<React.ReactNode>;
  href?: string;
}

/**
 * This component wrap children into html h1 element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {typographyItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered H1 component
 */
const H1 = ({
  children,
  className,
  ...props
}: typographyItemsProps): JSX.Element => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

/**
 * This component wrap children into html h2 element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {typographyItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered H2 component
 */
const H2 = ({
  children,
  className,
  ...props
}: typographyItemsProps): JSX.Element => {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
};

/**
 * This component wrap children into html h3 element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {typographyItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered H3 component
 */
const H3 = ({
  children,
  className,
  ...props
}: typographyItemsProps): JSX.Element => {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

/**
 * This component wrap children into html h4 element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {typographyItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered H4 component
 */
const H4 = ({
  children,
  className,
  ...props
}: typographyItemsProps): JSX.Element => {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
};

/**
 * This component wrap children into html h5 element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {typographyItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered H5 component
 */
const H5 = ({ children, ...props }: typographyItemsProps): JSX.Element => {
  return <h5 {...props}>{children}</h5>;
};

/**
 * This component wrap children into html h6 element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {typographyItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered H6 component
 */
const H6 = ({ children, ...props }: typographyItemsProps): JSX.Element => {
  return <h6 {...props}>{children}</h6>;
};

/**
 * This component wrap children into html p element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {typographyItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered P component
 */
const P = ({
  children,
  className,
  ...props
}: typographyItemsProps): JSX.Element => {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </p>
  );
};

/**
 * This component wrap children into html span element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {typographyItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered Span component
 */
const Span = ({ children, ...props }: typographyItemsProps): JSX.Element => {
  return <span {...props}>{children}</span>;
};

/**
 * This component wrap children into html a element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {typographyItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered A component
 */
const A = ({ children, href, ...props }: typographyItemsProps): JSX.Element => {
  return <a {...props}>{children}</a>;
};

/**
 * This component wrap children into html span code element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {typographyItemsProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered Code Span component
 */
const Code = ({ children, ...props }: typographyItemsProps): JSX.Element => {
  return (
    <span className="bg-gray-300 dark:bg-gray-600 rounded-sm px-2" {...props}>
      {children}
    </span>
  );
};

const typographyMap: Map<
  string,
  React.ComponentType<typographyItemsProps>
> = new Map([
  ["h1", H1],
  ["h2", H2],
  ["h3", H3],
  ["h4", H4],
  ["h5", H5],
  ["h6", H6],
  ["p", P],
  ["span", Span],
  ["a", A],
  ["code", Code],
]);

export function Typography({
  type,
  children,
  ...props
}: typographyProps): JSX.Element {
  const SelectedTypography = typographyMap.get(type);

  return SelectedTypography ? (
    <SelectedTypography {...props}>{children}</SelectedTypography>
  ) : (
    <p {...props}>{children}</p>
  );
}
