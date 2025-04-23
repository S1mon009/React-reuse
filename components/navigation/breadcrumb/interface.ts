import { FileMetadata } from "@/lib/file_structure/interface";

type Structure = Record<string, FileMetadata[]>;

export interface BreadcrumbNavigationProps {
  structure: Structure;
}
