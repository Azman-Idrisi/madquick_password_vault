import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/models/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  await connect();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1 hour" });
  return NextResponse.json({ token });
}
