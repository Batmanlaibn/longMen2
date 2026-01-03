import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public", "data", "user.json");

export async function DELETE(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "И-мэйл шаардлагатай" },
        { status: 400 }
      );
    }

    // Read current users
    const usersData = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
      : [];

    // Filter out the user to delete
    const updatedUsers = usersData.filter(
      (u: any) => u.email.toLowerCase() !== email.toLowerCase()
    );

    if (updatedUsers.length === usersData.length) {
      return NextResponse.json(
        { message: "Хэрэглэгч олдсонгүй" },
        { status: 404 }
      );
    }

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(updatedUsers, null, 2));

    return NextResponse.json({ 
      message: "Хэрэглэгч амжилттай устгагдлаа"
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Хэрэглэгч устгахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}