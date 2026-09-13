import { NextRequest, NextResponse } from "next/server";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { visibleImages as images } from "../../portfolio";

const selectionFile = path.resolve(process.cwd(), "../work/photo-selection.json");
const allowed = new Set(images);

export async function GET() {
  if (process.env.NODE_ENV !== "development") return new NextResponse(null, { status: 404 });
  try {
    const data = JSON.parse(await readFile(selectionFile, "utf8"));
    return NextResponse.json({ selected: data.selected.filter((src: string) => allowed.has(src)) });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return NextResponse.json({ selected: [] });
    return NextResponse.json({ error: "Could not load selection" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") return new NextResponse(null, { status: 404 });
  if (request.headers.get("origin") !== request.nextUrl.origin) return new NextResponse(null, { status: 403 });
  try {
    const { selected } = await request.json();
    if (!Array.isArray(selected) || selected.length > images.length || !selected.every((src) => typeof src === "string" && allowed.has(src))) {
      return NextResponse.json({ error: "Invalid selection" }, { status: 400 });
    }
    await mkdir(path.dirname(selectionFile), { recursive: true });
    await writeFile(selectionFile, JSON.stringify({ selected: [...new Set(selected)], savedAt: new Date().toISOString() }, null, 2), "utf8");
    return NextResponse.json({ saved: true });
  } catch {
    return NextResponse.json({ error: "Could not save selection" }, { status: 500 });
  }
}
