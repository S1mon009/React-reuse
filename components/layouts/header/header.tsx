import React from "react";

interface headerProps extends React.HTMLAttributes<HTMLElement> {
  children: Readonly<React.ReactNode>;
}

/**
 * This component wrap children into html header element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {mainProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered Header component
 */
export default function Header({ children, ...props }: headerProps) {
  return <header {...props}>{children}</header>;
}
