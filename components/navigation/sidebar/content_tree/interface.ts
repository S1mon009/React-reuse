import { FileMetadata } from "@/lib/file_structure/interface";

export interface ContentTreeItemProps {
  name: string;
  content: FileMetadata[];
  openPathName?: string;
}
export interface ContentTreeProps {
  locale: string;
}
