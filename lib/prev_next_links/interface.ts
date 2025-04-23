import { FileMetadata } from "@/lib/file_structure/interface";

export interface PrevNextLinksReturnType {
  prev: FileMetadata | null;
  next: FileMetadata | null;
}
