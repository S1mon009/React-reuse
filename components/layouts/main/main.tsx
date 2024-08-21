import React from "react";

interface mainProps extends React.HTMLAttributes<HTMLElement> {
  children: Readonly<React.ReactNode>;
}

/**
 * This component wrap children into html main element.
 *
 * Props:
 * - children (Readonly<React.ReactNode>): The children of the component.
 * - ...props: Everyone else props
 *
 * @param {mainProps} props - Contains children and everyone else props.
 * @returns {JSX.Element} The rendered Main component
 */
export default function Main({ children, ...props }: mainProps): JSX.Element {
  return <main {...props}>{children}</main>;
}
