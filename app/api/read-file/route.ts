import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Define the expected structure of the query params
interface QueryParams {
  filePath?: string;
}

export async function GET(request: Request): Promise<NextResponse> {
  // Parse URL to extract query parameters
  const url = new URL(request.url);
  const queryParams: QueryParams = Object.fromEntries(url.searchParams);

  const filePath = queryParams.filePath;

  if (!filePath) {
    return NextResponse.json(
      { error: "File path is required" },
      { status: 400 }
    );
  }

  // Ensure the file path is absolute or resolve it relative to the project root
  const resolvedFilePath: string = path.resolve(process.cwd(), filePath);

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
