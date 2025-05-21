import connectDb from "@/database/connection";
import Lesson from "@/database/models/lesson.schema";

export async function createLesson(req: Request) {
  try {
    await connectDb();
    const { title, description, videoUrl, course } = await req.json();
    const lesson = await Lesson.create({
      title,
      description,
      videoUrl,
      course,
    });
    return Response.json(
      {
        message: "Lesson created successfully",
        data: lesson,
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
