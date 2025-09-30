export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "a" | "code";
  children: Readonly<React.ReactNode>;
  href?: string;
}
export interface TypographyItemsProps
  extends React.HTMLAttributes<HTMLElement> {
  children: Readonly<React.ReactNode>;
  href?: string;
}
