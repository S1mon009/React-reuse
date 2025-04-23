import { FolderStructure } from "@/lib/file_structure/interface";

export interface TriggerProps {
  text: string;
}

export interface ListItemProps {
  title: string;
  href: string;
  children: Readonly<React.ReactNode>;
}

export interface MainListProps {
  objectKey: string | any;
  structure: FolderStructure;
}
