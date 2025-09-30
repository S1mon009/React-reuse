import { readdir, readFile } from "fs/promises";
import path from "path";
import {
  FolderStructure,
  LocaleStructure,
} from "@/lib/file_structure/interface";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale");

  if (!locale) {
    return new Response(JSON.stringify({ error: "Locale is required" }), {
      status: 400,
    });
  }

  try {
    const structure = await getContentStructure(locale);
    return new Response(JSON.stringify(structure), {
      status: 200,
    });
  } catch (error: unknown) {
    console.error("Error fetching content structure:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get content structure" }),
      { status: 500 },
    );
  }
}

async function getContentStructure(locale: string): Promise<LocaleStructure> {
  const baseDir = path.join(process.cwd(), "public", "content", locale);

  const entries = await readdir(baseDir, { withFileTypes: true });
  const subfolders = entries
    .filter((e) => e.isDirectory() && !e.name.startsWith("__"))
    .map((e) => e.name);

  const structure: FolderStructure = {};

  for (const folder of subfolders) {
    const folderPath = path.join(baseDir, folder);
    let files: string[];

    try {
      files = await readdir(folderPath);
    } catch (error: unknown) {
      console.error(`Error while reading folder ${folderPath}:`, error);
      continue;
    }

    structure[folder] = [];

    for (const fileName of files) {
      if (!fileName.endsWith(".mdx")) continue;
      const filePath = path.join(folderPath, fileName);
      const fileContent = await readFile(filePath, "utf-8");

      const getMatch = (rx: RegExp) =>
        (fileContent.match(rx)?.[1] ?? "").trim().replace(/['"]/g, "") ||
        undefined;

      const name = getMatch(/export\s+const\s+name\s*=\s*["'](.+?)["'];?/);
      const link = getMatch(/export\s+const\s+link\s*=\s*["'](.+?)["'];?/);
      const description = getMatch(
        /export\s+const\s+description\s*=\s*["'](.+?)["'];?/,
      );
      const createdAt = getMatch(
        /export\s+const\s+createdAt\s*=\s*["'](.+?)["'];?/,
      );

      if (!name || !link) {
        console.warn(`Skipping ${fileName}, Name/link is missing`);
        continue;
      }

      structure[folder].push({ name, link, description, createdAt });
    }
  }

  return { locale, structure };
}
