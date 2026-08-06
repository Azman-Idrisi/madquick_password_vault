import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/models/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function PUT(req: NextRequest) {
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
    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedNewPassword;
    await user.save();

    return NextResponse.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json(
      { error: "Failed to change password" },
      { status: 500 }
    );
  }
}
