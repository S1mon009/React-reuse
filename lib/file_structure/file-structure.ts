"use server";

import { readdir, readFile } from "fs/promises";
import path from "path";

import { FolderStructure, LocaleStructure } from "./interface";

export async function getContentStructure(
  locale: string
): Promise<LocaleStructure> {
  // Użycie path.resolve do określenia absolutnej ścieżki
  const baseDir = path.resolve("content", locale);

  const entries = await readdir(baseDir, { withFileTypes: true });

  const subfolders = entries
    .filter((e) => e.isDirectory() && !e.name.startsWith("__"))
    .map((e) => e.name);

  const structure: FolderStructure = {};

  for (const folder of subfolders) {
    const folderPath = path.resolve(baseDir, folder);
    let files: string[];

    try {
      files = await readdir(folderPath);
    } catch (error) {
      console.error(`Error while reading folder ${folderPath}:`, error);
      continue;
    }

    structure[folder] = [];

    for (const fileName of files) {
      if (!fileName.endsWith(".mdx")) continue;
      const filePath = path.resolve(folderPath, fileName); // Użycie path.resolve przy określaniu pełnej ścieżki do pliku
      const fileContent = await readFile(filePath, "utf-8");

      const getMatch = (rx: RegExp) =>
        (fileContent.match(rx)?.[1] ?? "").trim().replace(/['"]/g, "") ||
        undefined;

      const name = getMatch(/export\s+const\s+name\s*=\s*["'](.+?)["'];?/);
      const link = getMatch(/export\s+const\s+link\s*=\s*["'](.+?)["'];?/);
      const description = getMatch(
        /export\s+const\s+description\s*=\s*["'](.+?)["'];?/
      );
      const createdAt = getMatch(
        /export\s+const\s+createdAt\s*=\s*["'](.+?)["'];?/
      );

      if (!name || !link) {
        console.warn(`Skipping ${fileName}, brakuje name/link`);
        continue;
      }

      structure[folder].push({ name, link, description, createdAt });
    }
  }

  return { locale, structure };
}
