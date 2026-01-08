import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "public", "data", "user.json");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId = "bat", item, action } = body;

    console.log("📝 History API POST:", { userId, action, item });

    const fileData = await fs.readFile(filePath, "utf8");
    const users = JSON.parse(fileData);

    const userIndex = users.findIndex((u: any) => u.ner === userId);
    if (userIndex === -1) {
      console.error("❌ User not found:", userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!users[userIndex].viewHistory) {
      users[userIndex].viewHistory = [];
    }

    /* ========== ACTIONS ========== */

    // ➕ Chapter view нэмэх
    if (action === "add_view" && item) {
      const existsIndex = users[userIndex].viewHistory.findIndex(
        (h: any) => h.id === item.id && h.courseId === item.courseId
      );

      if (existsIndex !== -1) {
        users[userIndex].viewHistory[existsIndex] = {
          ...users[userIndex].viewHistory[existsIndex],
          viewedAt: item.viewedAt,
          viewCount: (users[userIndex].viewHistory[existsIndex].viewCount || 1) + 1,
        };
        console.log("✅ Updated existing history item");
      } else {
        users[userIndex].viewHistory.unshift({
          ...item,
          viewCount: 1,
        });
        console.log("✅ Added new history item");
      }

      users[userIndex].viewHistory = users[userIndex].viewHistory.slice(0, 50);
    }

    // 🗑 Нэг устгах
    if (action === "remove" && item?.id) {
      users[userIndex].viewHistory = users[userIndex].viewHistory.filter(
        (h: any) => !(h.id === item.id && h.courseId === item.courseId)
      );
      console.log("✅ Removed history item");
    }

    // 🧹 Бүгдийг цэвэрлэх
    if (action === "clear") {
      users[userIndex].viewHistory = [];
      console.log("✅ Cleared all history");
    }

    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    console.log("✅ Saved to user.json");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ History API error:", error);
    return NextResponse.json({ error: "Failed to save history" }, { status: 500 });
  }
}

// GET: Нийт үзэлтийн тоо авах
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const chapterId = searchParams.get("chapterId");
    const courseId = searchParams.get("courseId");

    if (!chapterId || !courseId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const fileData = await fs.readFile(filePath, "utf8");
    const users = JSON.parse(fileData);

    let totalViews = 0;
    let uniqueViewers = 0;

    users.forEach((user: any) => {
      if (user.viewHistory) {
        const found = user.viewHistory.find(
          (h: any) => h.id === parseInt(chapterId) && h.courseId === parseInt(courseId)
        );
        if (found) {
          totalViews += found.viewCount || 1;
          uniqueViewers += 1;
        }
      }
    });

    const result = {
      totalViews,
      uniqueViewers,
      totalUsers: users.length
    };

    console.log("📊 Stats for chapter", chapterId, ":", result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ Get views error:", error);
    return NextResponse.json({ error: "Failed to get views" }, { status: 500 });
  }
}