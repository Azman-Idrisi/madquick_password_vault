import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/models/Users";   
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  await connect();

  const existingUser = await User.findOne({ email });
  if (existingUser) return NextResponse.json({ error: "User exists" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });
  return NextResponse.json({ message: "User created", userId: user._id });
}
