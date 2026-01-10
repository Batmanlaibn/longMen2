import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { addTrendingView } from "@/lib/trendingStore";


const filePath = path.join(process.cwd(), "public", "data", "user.json");

/* ================= POST ================= */
export async function POST(req: Request) {
  try {
    const { userId = "bat", item, action } = await req.json();

    const fileData = await fs.readFile(filePath, "utf8");
    const users = JSON.parse(fileData);

    const user = users.find((u: any) => u.ner === userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.viewHistory) user.viewHistory = [];

    /* ➕ ADD VIEW */
    if (action === "add_view" && item) {
      const existing = user.viewHistory.find(
        (h: any) =>
          h.id === item.id &&
          h.courseId === item.courseId &&
          h.type === "chapter"
      );

      if (existing) {
        existing.viewCount = (existing.viewCount || 1) + 1;
        existing.viewedAt = item.viewedAt;
      } else {
        user.viewHistory.unshift({
          ...item,
          type: "chapter",
          viewCount: 1,
        });
      }

      // max 50 history
      user.viewHistory = user.viewHistory.slice(0, 50);
      
      // REAL-TIME TREND UPDATE
      addTrendingView(item);
    }

    /* 🗑 REMOVE ONE */
    if (action === "remove" && item?.id) {
      user.viewHistory = user.viewHistory.filter(
        (h: any) => !(h.id === item.id && h.courseId === item.courseId)
      );
    }

    /* 🧹 CLEAR */
    if (action === "clear") {
      user.viewHistory = [];
    }

    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ POST history error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/* ================= GET ================= */
/* 📊 Chapter статистик */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const chapterId = Number(searchParams.get("chapterId"));
    const courseId = Number(searchParams.get("courseId"));

    const fileData = await fs.readFile(filePath, "utf8");
    const users = JSON.parse(fileData);

    let totalViews = 0;
    let uniqueViewers = 0;

    users.forEach((u: any) => {
      const found = u.viewHistory?.find(
        (h: any) =>
          h.id === chapterId &&
          h.courseId === courseId &&
          h.type === "chapter"
      );

      if (found) {
        uniqueViewers++;
        totalViews += found.viewCount || 1;
      }
    });

    return NextResponse.json({
      totalViews,
      uniqueViewers,
      totalUsers: users.length,
    });
  } catch (err) {
    console.error("❌ GET history error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
