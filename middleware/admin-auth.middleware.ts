// middleware/admin-auth.ts
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Role } from "@/database/models/user.schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const adminAuth = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { message: "Authentication required" },
      { status: 401 }
    );
  }

  if (session.user.role !== Role.Admin) {
    return NextResponse.json(
      { message: "Admin privileges required" },
      { status: 403 }
    );
  }

  return NextResponse.next();
};

export default adminAuth;
