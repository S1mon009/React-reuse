import { type JSX } from "react";

export interface EachProps<T> {
  render: (item: T, index: number) => JSX.Element;
  of: T[];
}
