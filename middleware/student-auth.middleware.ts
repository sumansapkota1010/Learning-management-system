// middleware/student-auth.ts
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Role } from "@/database/models/user.schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const studentAuth = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { message: "Authentication required" },
      { status: 401 }
    );
  }

  if (session.user.role !== Role.Student) {
    return NextResponse.json(
      { message: "Student account required for this action" },
      { status: 403 }
    );
  }

  return NextResponse.next();
};
