import { FileMetadata } from "@/lib/file_structure/interface";

export interface PrevNextLinksReturnType {
  prev: FileMetadata | null;
  next: FileMetadata | null;
}

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale");
  const path = searchParams.get("path");

  if (!locale || !path) {
    return new Response(JSON.stringify({ error: "Missing locale or path" }), {
      status: 400,
    });
  }

  try {
    const res = await fetch(
      `http://localhost:3000/api/get-folder-structure?locale=${locale}`
    );
    const { structure } = await res.json();
    const sections = Object.keys(structure);

    const allItems: FileMetadata[] = [];
    for (const section of sections) {
      allItems.push(...structure[section]);
    }

    const idx = allItems.findIndex((item) => item.link === path.slice(3));
    if (idx === -1) {
      return new Response(JSON.stringify({ prev: null, next: null }), {
        status: 200,
      });
    }

    const prev = idx > 0 ? allItems[idx - 1] : null;
    const next = idx < allItems.length - 1 ? allItems[idx + 1] : null;

    const result: PrevNextLinksReturnType = { prev, next };
    console.log("Result:", result);

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in prev-next API:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
