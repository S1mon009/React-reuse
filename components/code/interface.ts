export interface CodeProps {
  code: string;
  language?: string;
}

interface Trigger {
  value: string;
  title: string;
}

interface Content {
  value: string;
  code: string;
  ariaLabel?: string;
}

export interface CodeTabsProps {
  defaultValue: string;
  triggers: Trigger[];
  contents: Content[];
}

export interface CodeContentProps {
  code: string;
  language?: string;
}
