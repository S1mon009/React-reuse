import { cn } from "@/lib/utils";

interface sidebarProps {
  children: React.ReactNode;
  className?: string;
}

interface sidebarContentProps extends sidebarProps {}

interface sidebarHeaderProps extends sidebarProps {}

export function Sidebar({ className, children }: sidebarProps): JSX.Element {
  return <div className={cn("w-full px-2 pb-2", className)}>{children}</div>;
}

export function SidebarContent({
  children,
  className,
}: sidebarContentProps): JSX.Element {
  return (
    <div className={cn("[&:not(:first-child)]:ml-2", className)}>
      {children}
    </div>
  );
}

export function SidebarHeader({
  children,
  className,
}: sidebarHeaderProps): JSX.Element {
  return <div className={`font-semibold py-2 ${className}`}>{children}</div>;
}
