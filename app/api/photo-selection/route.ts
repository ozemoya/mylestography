import { NextRequest, NextResponse } from "next/server";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { visibleImages, onSiteImages } from "../../portfolio";

const selectionFile = path.resolve(process.cwd(), "../work/photo-selection.json");
const allowed = new Set([...visibleImages, ...onSiteImages]);

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
  // Next's development server can normalize nextUrl to localhost even when
  // the browser uses 127.0.0.1. Compare the browser origin to the actual host.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  try {
    const source = new URL(origin ?? "");
    if (source.protocol !== "http:" || !["127.0.0.1", "localhost", "[::1]"].includes(source.hostname) || source.host !== host) {
      return new NextResponse(null, { status: 403 });
    }
  } catch {
    return new NextResponse(null, { status: 403 });
  }
  try {
    const { selected } = await request.json();
    if (!Array.isArray(selected) || selected.length > allowed.size || !selected.every((src) => typeof src === "string" && allowed.has(src))) {
      return NextResponse.json({ error: "Invalid selection" }, { status: 400 });
    }
    await mkdir(path.dirname(selectionFile), { recursive: true });
    await writeFile(selectionFile, JSON.stringify({ selected: [...new Set(selected)], savedAt: new Date().toISOString() }, null, 2), "utf8");
    return NextResponse.json({ saved: true });
  } catch {
    return NextResponse.json({ error: "Could not save selection" }, { status: 500 });
  }
}
