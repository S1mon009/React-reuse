import React, { Children, ReactElement, type JSX } from "react";

import { ShowProps, ConditionalProps, ElseProps } from "./interface";

/**
 * The Show component renders its children based on conditional subcomponents.
 *
 * @param {ShowProps} props - The props object.
 * @returns {ReactElement | null} - Returns the first child with isTrue prop set to true, or the first child without an isTrue prop, or null if none match.
 */
const Show: React.FC<ShowProps> & {
  When: React.FC<ConditionalProps>;
  Else: React.FC<ElseProps>;
} = (props): JSX.Element | null => {
  let when: ReactElement<any> | null = null;
  let otherwise: ReactElement<any> | null = null;

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

/**
 * Show.When renders its children if the isTrue prop is true.
 *
 * @param {object} props - The props object.
 * @param {boolean} [props.isTrue] - The condition to determine if children should be rendered.
 * @param {ReactNode} props.children - The child nodes to be rendered if isTrue is true.
 * @returns {ReactElement | null} - Returns the children if isTrue is true, otherwise null.
 */
Show.When = ({ isTrue, children }: ConditionalProps): JSX.Element | null =>
  isTrue ? <>{children}</> : null;
Show.When.displayName = "Show.When";

/**
 * Show.Else renders either the render prop or the children if provided.
 *
 * @param {object} props - The props object.
 * @param {ReactNode} [props.render] - The node to render.
 * @param {ReactNode} [props.children] - The child nodes to be rendered if render is not provided.
 * @returns {ReactElement} - Returns the render prop or the children.
 */
Show.Else = ({ render, children }: ElseProps): JSX.Element | null => (
  <>{render || children}</>
);
Show.Else.displayName = "Show.Else";

export default Show;
