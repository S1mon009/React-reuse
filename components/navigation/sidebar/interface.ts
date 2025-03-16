export interface SidebarProps {
  children: Readonly<React.ReactNode>;
  className?: string;
}

export interface SidebarContentProps extends SidebarProps {}

export interface SidebarHeaderProps extends SidebarProps {}
