import React from "react";

interface mainProps extends React.HTMLAttributes<HTMLElement> {
  children: Readonly<React.ReactNode>;
}

export default function Main({ children, ...props }: mainProps) {
  return <main {...props}>{children}</main>;
}
