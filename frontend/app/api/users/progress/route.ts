import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "public", "data", "user.json");

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const users = JSON.parse(await fs.readFile(filePath, "utf8"));
  const user = users.find((u: any) => u.ner === userId);

  if (!user) return NextResponse.json({});

  const progress: Record<number, number> = {};

  user.viewHistory?.forEach((h: any) => {
    if (h.type !== "chapter") return;
    progress[h.courseId] = (progress[h.courseId] || 0) + 1;
  });

  return NextResponse.json(progress);
}
