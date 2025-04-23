"use server";

import { promises as fs } from "fs";
import path from "path";

export async function getFileContent(filePath?: string): Promise<string> {
  if (!filePath) {
    throw new Error("File path is required");
  }

  const resolvedFilePath = path.join(process.cwd(), "public", filePath);

  try {
    const fileContent = await fs.readFile(resolvedFilePath, "utf-8");
    return fileContent;
  } catch (err) {
    console.error("Error reading file:", err);
    throw new Error("File not found or unable to read");
  }
}
