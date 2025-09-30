import type { JSX } from "react";

import { cn } from "@/lib/utils";

import { TypographyProps, TypographyItemsProps } from "./interface";

const H1 = ({
  children,
  className,
  ...props
}: TypographyItemsProps): JSX.Element => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

const H2 = ({
  children,
  className,
  ...props
}: TypographyItemsProps): JSX.Element => {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
};

const H3 = ({
  children,
  className,
  ...props
}: TypographyItemsProps): JSX.Element => {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

const H4 = ({
  children,
  className,
  ...props
}: TypographyItemsProps): JSX.Element => {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  );
};

const H5 = ({ children, ...props }: TypographyItemsProps): JSX.Element => {
  return <h5 {...props}>{children}</h5>;
};

const H6 = ({ children, ...props }: TypographyItemsProps): JSX.Element => {
  return <h6 {...props}>{children}</h6>;
};

const P = ({
  children,
  className,
  ...props
}: TypographyItemsProps): JSX.Element => {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </p>
  );
};

const Span = ({ children, ...props }: TypographyItemsProps): JSX.Element => {
  return <span {...props}>{children}</span>;
};

const A = ({ children, href, ...props }: TypographyItemsProps): JSX.Element => {
  return (
    <a {...props} href={href}>
      {children}
    </a>
  );
};

const Code = ({ children, ...props }: TypographyItemsProps): JSX.Element => {
  return (
    <span className="rounded-sm bg-gray-300 px-2 dark:bg-gray-600" {...props}>
      {children}
    </span>
  );
};

const typographyMap: Map<
  string,
  React.ComponentType<TypographyItemsProps>
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

export default function Typography({
  type,
  children,
  ...props
}: TypographyProps): JSX.Element {
  const SelectedTypography = typographyMap.get(type);

  return SelectedTypography ? (
    <SelectedTypography {...props}>{children}</SelectedTypography>
  ) : (
    <p {...props}>{children}</p>
  );
}
