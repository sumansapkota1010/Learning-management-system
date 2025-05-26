import connectDb from "@/database/connection";
import Course from "@/database/models/course.schema";
import Lesson from "@/database/models/lesson.schema";
import { NextResponse } from "next/server";

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
    return NextResponse.json(
      {
        message: "Lesson created successfully",
        data: lesson,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function fetchLessons(req: Request) {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    const lessons = await Lesson.find({ course: courseId }).populate("course");

    if (lessons.length === 0) {
      return NextResponse.json(
        {
          message: "No lesson found",
          data: [],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Lessons fetched successfully",
        data: lessons,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function fetchLesson(req: Request, id: string) {
  try {
    await connectDb();
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return NextResponse.json(
        {
          message: "No lesson found with that ID",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Lesson fetched successfully",
        data: lesson,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
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
    if (!deletedLesson) {
      return NextResponse.json(
        {
          message: "Lesson not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Lesson deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
