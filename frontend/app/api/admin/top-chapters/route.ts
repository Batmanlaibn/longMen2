import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "public", "data", "user.json");
const last7Days = Date.now() - 7 * 24 * 60 * 60 * 1000;

export async function GET() {
  const users = JSON.parse(await fs.readFile(filePath, "utf8"));
  const map: Record<string, any> = {};

  users.forEach((u: any) => {
    u.viewHistory?.forEach((h: any) => {
      if (h.type !== "chapter") return;
      if (new Date(h.viewedAt).getTime() < last7Days) return;

      const key = `${h.courseId}-${h.id}`;

      if (!map[key]) {
        map[key] = {
          chapterId: h.id,
          courseId: h.courseId,
          title: h.title,
          totalViews: 0,
          viewers: 0,
        };
      }

      map[key].totalViews += h.viewCount || 1;
      map[key].viewers += 1;
    });
  });

  return NextResponse.json(
    Object.values(map).sort(
      (a: any, b: any) => b.totalViews - a.totalViews
    )
  );
}
