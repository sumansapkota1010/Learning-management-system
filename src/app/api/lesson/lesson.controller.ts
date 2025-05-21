import connectDb from "@/database/connection";
import Course from "@/database/models/course.schema";
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

export async function fetchLesson(req: Request) {
  try {
    await connectDb();
    const lessons = await Lesson.find().populate({
      path: "course",
      model: Course,
    });
    if (lessons.length == 0) {
      return Response.json(
        {
          message: "No lesson  found",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        message: "Lessons fetched successfully",
        data: lessons,
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

export async function deleteLesson(req: Request, id: string) {
  try {
    await connectDb();
    const deletedLesson = await Lesson.findByIdAndDelete(id);
    if (deletedLesson) {
      return Response.json(
        {
          message: "Lesson deleted successfully",
        },
        { status: 200 }
      );
    }
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
