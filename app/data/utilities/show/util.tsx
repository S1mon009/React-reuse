import React, { Children, ReactNode, ReactElement } from "react";

interface showInterface {
  children: ReactNode;
}

interface conditionalInterface {
  isTrue?: boolean;
  children: ReactNode;
}

interface elseInterface {
  render?: ReactNode;
  children?: ReactNode;
}

const Show: React.FC<showInterface> & {
  When: React.FC<conditionalInterface>;
  Else: React.FC<elseInterface>;
} = (props) => {
  let when: ReactElement | null = null;
  let otherwise: ReactElement | null = null;

  Children.forEach(props.children, (child) => {
    if (React.isValidElement(child)) {
      if (child.props.isTrue === undefined) {
        otherwise = child;
      } else if (!when && child.props.isTrue === true) {
        when = child;
      }
    }
  });

  return when || otherwise;
};

Show.displayName = "Show";

Show.When = ({ isTrue, children }: conditionalInterface) =>
  isTrue ? <>{children}</> : null;
Show.When.displayName = "Show.When";

Show.Else = ({ render, children }: elseInterface) => <>{render || children}</>;
Show.Else.displayName = "Show.Else";

export default Show;
