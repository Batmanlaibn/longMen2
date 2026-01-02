import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

import users from "../../../data/user.json";

export async function GET() {
  return NextResponse.json(users);
}



// Хэрэглэгчийн type тодорхойлно
type User = {
  ner: string;
  email: string;
  utas: string;
  nas: number;
  nuutsugs: string;
};

const filePath = path.join(process.cwd(), "data", "user.json");

export async function POST(req: NextRequest) {
  try {
    const { ner, email, utas, nas, nuutsugs } = await req.json();

    if (!ner || !email || !utas || !nas || !nuutsugs) {
      return NextResponse.json({ message: "Бүх талбаруудыг бөглөнө үү" }, { status: 400 });
    }

    if (Number(nas) < 18) {
      return NextResponse.json({ message: "Нас хүрээгүй байна" }, { status: 400 });
    }

    // Файлыг унших
    const usersData: User[] = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
      : [];

    // Email давхардах шалгах
    const existingUser = usersData.find((u: User) => u.email === email);

    if (existingUser) {
      return NextResponse.json({ message: "И-мэйл аль хэдийн бүртгэлтэй байна" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(nuutsugs, 10);

    const newUser: User = { ner, email, utas, nas: Number(nas), nuutsugs: hashedPassword };
    usersData.push(newUser);

    fs.writeFileSync(filePath, JSON.stringify(usersData, null, 2));

    return NextResponse.json({ message: "Бүртгэл амжилттай боллоо" });
  } catch (error) {
    return NextResponse.json({ message: "Алдаа гарлаа" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const usersData: User[] = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
      : [];
    return NextResponse.json(usersData);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}


