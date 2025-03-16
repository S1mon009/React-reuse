export interface LinksProps {
  type: "desktop" | "mobile";
}

export interface ListItemProps {
  title: string;
  href: string;
  children: Readonly<React.ReactNode>;
}
