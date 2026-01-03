

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public", "data", "user.json");

export async function PUT(req: NextRequest) {
  try {
    const { email, settings } = await req.json();

    if (!email || !settings) {
      return NextResponse.json(
        { message: "И-мэйл болон тохиргоо шаардлагатай" },
        { status: 400 }
      );
    }

    // Read current users
    const usersData = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
      : [];

    // Find user index
    const userIndex = usersData.findIndex(
      (u: any) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (userIndex === -1) {
      return NextResponse.json(
        { message: "Хэрэглэгч олдсонгүй" },
        { status: 404 }
      );
    }

    // Update user with new settings (keep existing data like courses, achievements, etc.)
    usersData[userIndex] = {
      ...usersData[userIndex],
      ner: settings.ner,
      utas: settings.utas,
      nas: settings.nas,
      bio: settings.bio,
      avatar: settings.avatar,
      darkMode: settings.darkMode,
      emailNotifications: settings.emailNotifications,
      pushNotifications: settings.pushNotifications,
      soundEffects: settings.soundEffects,
      autoplay: settings.autoplay,
      language: settings.language,
      timezone: settings.timezone,
      twoFactor: settings.twoFactor,
      studyGoal: settings.studyGoal,
      difficulty: settings.difficulty,
      notificationTypes: settings.notificationTypes
    };

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(usersData, null, 2));

    return NextResponse.json({ 
      message: "Тохиргоо амжилттай хадгалагдлаа",
      user: usersData[userIndex]
    });
  } catch (error) {
    console.error("Error updating user settings:", error);
    return NextResponse.json(
      { message: "Тохиргоо хадгалахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}
// ```

// ## Summary of Changes:

// ### 1. **Frontend (React Component)**
// - Now calls `/api/users/update` endpoint with PUT request
// - Sends email and all settings data
// - Still saves to localStorage as backup
// - Shows success/error messages

// ### 2. **Backend API** (`/api/users/update/route.ts`)
// - Creates new PUT endpoint
// - Reads user.json file
// - Finds user by email
// - Updates ONLY settings fields (preserves courses, achievements, stats, etc.)
// - Writes updated data back to user.json
// - Returns success response

// ### 3. **Data Flow**
// ```
// User changes settings → Click "Хадгалах" 
// → Frontend calls API → Backend updates user.json 
// → Success message shown → Data persisted permanently