import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filePath = searchParams.get("filePath");

  if (!filePath) {
    return NextResponse.json(
      { error: "File path is required" },
      { status: 400 }
    );
  }

  const resolvedFilePath = path.join(process.cwd(), "public", filePath);

  try {
    const fileContent = await fs.readFile(resolvedFilePath, "utf-8");
    return NextResponse.json({ content: fileContent });
  } catch (err) {
    console.error("Error reading file:", err);
    return NextResponse.json(
      { error: "File not found or unable to read" },
      { status: 404 }
    );
  }
}
