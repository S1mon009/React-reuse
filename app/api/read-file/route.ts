import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface QueryParams {
  filePath?: string;
}

/**
 * Handles GET requests to read a file's content from the server's public directory.
 *
 * @param {Request} request - The incoming HTTP request object.
 * @returns {Promise<NextResponse>} - A JSON response with the file content or an error message.
 */
export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const queryParams: QueryParams = Object.fromEntries(url.searchParams);

  const filePath = queryParams.filePath;

  if (!filePath) {
    return NextResponse.json(
      { error: "File path is required" },
      { status: 400 }
    );
  }

  const resolvedFilePath: string = path.join(process.cwd(), "public", filePath);

  try {
    const fileContent: string = await fs.readFile(resolvedFilePath, "utf-8");

    return NextResponse.json({ content: fileContent });
  } catch (error) {
    console.error("Error reading file:", error);

    return NextResponse.json(
      { error: "File not found or unable to read" },
      { status: 404 }
    );
  }
}
