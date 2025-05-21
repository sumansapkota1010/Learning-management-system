import connectDb from "@/database/connection";
import Course from "@/database/models/course.schema";

export async function createCourse(req: Request) {
  try {
    connectDb();
    const { title, description, price, duration, category } = await req.json();

    const course = await Course.create({
      title,
      description,
      price,
      duration,
      category,
    });
    return Response.json(
      {
        message: "Course created successfully",
        data: course,
      },
      { status: 201 }
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
