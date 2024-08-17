import { cn } from "@/lib/utils";

interface sidebarProps {
  children: React.ReactNode;
  className?: string;
}

interface sidebarContentProps extends sidebarProps {}

interface sidebarHeaderProps extends sidebarProps {}

export function Sidebar({ className, children }: sidebarProps): JSX.Element {
  return <div className={cn("w-full", className)}>{children}</div>;
}

export function SidebarContent({
  children,
  className,
}: sidebarContentProps): JSX.Element {
  return <div className={className}>{children}</div>;
}

export function SidebarHeader({
  children,
  className,
}: sidebarHeaderProps): JSX.Element {
  return (
    <div
      className={`font-semibold [&:not(:first-child)]:py-2 [&:first-child]:pb-2 ${className}`}
    >
      {children}
    </div>
  );
}
