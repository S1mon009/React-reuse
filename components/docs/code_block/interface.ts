interface Trigger {
  value: string;
  title: string;
}

interface Content {
  value: string;
  code: string;
  ariaLabel?: string;
}

export interface CodeBlockProps {
  defaultValue: string;
  triggers: Trigger[];
  contents: Content[];
}
