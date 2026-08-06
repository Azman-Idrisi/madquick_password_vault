import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import VaultItem from "@/models/VaultItem";
import jwt from "jsonwebtoken";
import { decryptData } from "@/lib/crypto";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  await connect();
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });

  let userId: string;
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    userId = payload.userId;
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const items = await VaultItem.find({ userId }).sort({ createdAt: -1 });
  const decrypted = items.map((item) => ({
    ...item.toObject(),
    password: decryptData(item.password),
  }));
  return NextResponse.json({ data: decrypted });
}

