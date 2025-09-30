export interface ShowProps {
  children: Readonly<React.ReactNode>;
}

export interface ConditionalProps {
  isTrue?: boolean;
  children: Readonly<React.ReactNode>;
}

export interface ElseProps {
  render?: Readonly<React.ReactNode>;
  children?: Readonly<React.ReactNode>;
}
