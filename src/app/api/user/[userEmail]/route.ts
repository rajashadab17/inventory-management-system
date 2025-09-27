import { connectToDatabase } from "@/lib/db";
import User, { IUser } from "@/models/User";
import { NextResponse } from "next/server";

interface Params {
  params: { userEmail: string };
}

export async function GET(
  req: Request,
  { params }: Params
): Promise<Response> {
  try {
    await connectToDatabase();

    const { userEmail } = params;
    if (!userEmail) {
      return NextResponse.json(
        { success: false, message: "Kindly fill all the fields!" },
        { status: 400 }
      );
    }

    const user: IUser | null = await User.findOne({ userEmail });

    if (!user) {
      return NextResponse.json(
        { success: true, message: "User not found!" },
        { status: 200 }
      );
    }

    return NextResponse.json({ success: true, user }, { status: 200 });

  } catch (error) {
    console.error("Error fetching User Details:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
