import connectDb from "@/database/connection";
import Course from "@/database/models/course.schema";
import Enrollment from "@/database/models/enrollment.schema";
import Lesson from "@/database/models/lesson.schema";

export async function enrollCourse(req: Request) {
  try {
    await connectDb();
    const { course, whatsapp } = await req.json();
    const enrolledCourse = await Enrollment.create({
      whatsapp,
      course,
    });
    return Response.json(
      {
        message: "You enrolled the course",
        data: enrolledCourse,
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

export async function fetchEnrollments(req: Request) {
  try {
    await connectDb();
    const lessons = await Enrollment.find()
      .populate("course")
      .populate("student");
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

export async function fetchSingleEnrollment(req: Request, id: string) {
  try {
    await connectDb();
    const singleEnrollment = await Enrollment.findById(id)
      .populate("course")
      .populate("student");
    if (singleEnrollment) {
      return Response.json(
        {
          message: "Single Enrollment fetched",
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

export async function changeEnrollmentStatus(req: Request, id: string) {
  try {
    await connectDb();
    const { status } = await req.json();
    const data = await Enrollment.findByIdAndUpdate(id, {
      enrollmentStatus: status,
    });
    return Response.json({
      message: "Enrollment status updated",
      data,
    });
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

export async function deleteEnrollment(req: Request, id: string) {
  try {
    await connectDb();
    const deltetedEnrollment = await Enrollment.findByIdAndDelete(id);

    if (deltetedEnrollment) {
      return Response.json(
        {
          message: "Enrollment deleted",
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
