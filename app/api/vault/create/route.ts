import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import VaultItem from "@/models/VaultItem";
import jwt from "jsonwebtoken";
import { encryptData } from "@/lib/crypto";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  await connect();
  const authorization = req.headers.get("authorization");
  if (!authorization) return NextResponse.json({ error: "No token" }, { status: 401 });

  const token = authorization.replace("Bearer ", "");
  let userId: string;
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    userId = payload.userId;
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const data = await req.json();
  const item = await VaultItem.create({
    ...data,
    password: encryptData(data.password),
    userId,
  });
  return NextResponse.json({ data: item });
}

