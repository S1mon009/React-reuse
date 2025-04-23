"use server";

import { getContentStructure } from "@/lib/file_structure/file-structure";
import { PrevNextLinksReturnType } from "./interface";
import { FileMetadata } from "@/lib/file_structure/interface";

export async function getPrevNextLinks(
  path: string,
  locale: string
): Promise<PrevNextLinksReturnType> {
  const { structure } = await getContentStructure(locale);

  const sections = Object.keys(structure);

  const allItems: FileMetadata[] = [];
  for (const section of sections) {
    allItems.push(...structure[section]);
  }

  const idx = allItems.findIndex((item) => item.link === path.slice(3));
  if (idx === -1) {
    return { prev: null, next: null };
  }

  const prev = idx > 0 ? allItems[idx - 1] : null;
  const next = idx < allItems.length - 1 ? allItems[idx + 1] : null;
  return { prev, next };
}
