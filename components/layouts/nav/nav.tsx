import React from "react";

interface navProps extends React.HTMLAttributes<HTMLElement> {
  children: Readonly<React.ReactNode>;
}

/**
 * This component wrap children into html nav element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {mainProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered Nav component
 */
export default function Nav({ children, ...props }: navProps) {
  return <nav {...props}>{children}</nav>;
}
