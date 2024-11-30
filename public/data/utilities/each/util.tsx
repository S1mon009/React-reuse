interface eachInterface<T> {
  render: (item: T, index: number) => JSX.Element;
  of: T[];
}

export const Each = <T,>({ render, of }: eachInterface<T>): JSX.Element[] => {
  return of.map((item, index) => render(item, index));
};
