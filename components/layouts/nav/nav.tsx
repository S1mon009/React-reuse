import React from "react";

interface navProps extends React.HTMLAttributes<HTMLElement> {
  children: Readonly<React.ReactNode>;
}

export default function Nav({ children, ...props }: navProps) {
  return <nav {...props}>{children}</nav>;
}
