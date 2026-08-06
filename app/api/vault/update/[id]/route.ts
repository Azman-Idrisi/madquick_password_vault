import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import VaultItem from "@/models/VaultItem";
import jwt from "jsonwebtoken";
import { encryptData } from "@/lib/crypto";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connect();

  const authorization = req.headers.get("authorization");
  if (!authorization) {
    return NextResponse.json({ error: "No token" }, { status: 401 });
  }

  const token = authorization.replace("Bearer ", "");
  let userId: string;

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    userId = payload.userId;
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const data = await req.json();

    // Find the item and verify ownership
    const item = await VaultItem.findById(id);
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    if (item.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Update the item
    const updatedItem = await VaultItem.findByIdAndUpdate(
      id,
      {
        title: data.title,
        username: data.username,
        password: encryptData(data.password),
        url: data.url,
        notes: data.notes,
      },
      { new: true } // Return the updated document
    );

    return NextResponse.json({ data: updatedItem });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
  }
}
