import { NextRequest, NextResponse } from "next/server";
import { readdir, readFile, stat } from "fs/promises";
import path from "path";

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

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Hello from the test route" });
}
