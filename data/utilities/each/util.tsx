interface eachInterface {
  render: (item: any, index: number) => JSX.Element;
  of: any[];
}

export const Each = ({ render, of }: eachInterface): JSX.Element[] => {
  return of.map((item, index) => render(item, index));
};
