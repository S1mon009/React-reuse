export interface FileMetadata {
  name: string;
  link: string;
  description?: string;
  createdAt?: string;
}

export interface FolderStructure {
  [folderName: string]: FileMetadata[];
}

export interface LocaleStructure {
  locale: string;
  structure: FolderStructure;
}
