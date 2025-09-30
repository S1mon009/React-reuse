export interface LayoutProps extends React.HTMLAttributes<HTMLElement> {
  type:
    | "main"
    | "header"
    | "nav"
    | "div"
    | "aside"
    | "section"
    | "article"
    | "footer"
    | "mdx";
  children: Readonly<React.ReactNode>;
}
export interface LayoutItemsProps extends React.HTMLAttributes<HTMLElement> {
  children: Readonly<React.ReactNode>;
}
