import { connectToDatabase } from "@/lib/db";
import User, { IUser } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
  params: {
    userEmail: string;
  };
}

export async function GET(
  req: NextRequest,
  context: RouteContext
) {
  try {
    await connectToDatabase();

    const { userEmail } = context.params;

    if (!userEmail) {
      return NextResponse.json(
        { success: false, message: "Kindly fill all the fields!" },
        { status: 400 }
      );
    }

    const user: IUser | null = await User.findOne({ userEmail });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
