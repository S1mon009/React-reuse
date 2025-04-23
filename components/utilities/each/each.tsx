import type { JSX } from "react";

import { EachProps } from "./interface";

const Each = <T,>({ render, of }: EachProps<T>): JSX.Element[] => {
  return of.map((item, index) => render(item, index));
};

export default Each;
