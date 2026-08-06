import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import VaultItem from "@/models/VaultItem";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const { id } = await params;
  await VaultItem.deleteOne({ _id: id, userId });
  return NextResponse.json({ message: "Deleted successfully" });
}

