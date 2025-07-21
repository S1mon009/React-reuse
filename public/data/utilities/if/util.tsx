import type { JSX } from "react";

interface IfProps {
  condition: boolean;
  children: React.ReactNode;
  else?: React.ReactNode;
}

export const If = ({
  condition,
  children,
  else: elseNode,
}: IfProps): JSX.Element => {
  return <>{condition ? children : elseNode}</>;
};
