import { connectToDatabase } from "@/lib/db";
import User, { IUser } from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const userData = await request.json();
    let newUser = new User(userData);
    await newUser.save();
    return NextResponse.json({ status: 201 });
    
  } catch (error) {
    console.error("Error registering User", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
