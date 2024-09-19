import fs from "fs";
import path from "path";

/**
 * Reads and returns the content of a file.
 *
 * Props:
 * - filePath (string): Relative path of the file to be read.
 *
 * @returns {string} The content of the file as a string.
 * @throws Will throw an error if reading the file fails.
 */
export function getFileData(filePath: string) {
  const fullPath = path.join(process.cwd(), filePath);
  try {
    const data = fs.readFileSync(fullPath, "utf-8");
    return data;
  } catch (error) {
    console.error("Error reading file:", error);
    throw new Error("File reading failed");
  }
}
