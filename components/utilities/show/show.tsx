import React, { Children, ReactElement, JSX } from "react";
import { ShowProps, ConditionalProps, ElseProps } from "./interface";

const Show: React.FC<ShowProps> & {
  When: React.FC<ConditionalProps>;
  Else: React.FC<ElseProps>;
} = ({ children }): JSX.Element | null => {
  let when: ReactElement | null = null;
  let otherwise: ReactElement | null = null;

  Children.forEach(children, (child) => {
    if (React.isValidElement<ConditionalProps>(child)) {
      const typedChild = child as ReactElement<ConditionalProps>;

      if (typedChild.props.isTrue === undefined) {
        otherwise = typedChild;
      } else if (!when && typedChild.props.isTrue) {
        when = typedChild;
      }
    }
  });

  return when || otherwise;
};

Show.displayName = "Show";

Show.When = ({ isTrue, children }: ConditionalProps): JSX.Element | null =>
  isTrue ? <>{children}</> : null;
Show.When.displayName = "Show.When";

Show.Else = ({ render, children }: ElseProps): JSX.Element | null => (
  <>{render || children}</>
);
Show.Else.displayName = "Show.Else";

export default Show;
