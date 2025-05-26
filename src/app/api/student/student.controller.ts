import connectDb from "@/database/connection";
import User, { Role } from "@/database/models/user.schema";

export async function fetchStudent(req: Request) {
  try {
    await connectDb();

    const students = await User.find({ role: Role.Student });
    if (students.length === 0) {
      return Response.json(
        {
          message: "No student found",
          data: [],
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        message: "User fetched Successfully",
        data: students,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
