import connectDb from "@/database/connection";
import Course from "@/database/models/course.schema";
import Lesson from "@/database/models/lesson.schema";

export async function createCourse(req: Request) {
  try {
    connectDb();
    const { title, description, price, duration, category } = await req.json();

    const createdCourse = await Course.create({
      title,
      description,
      price,
      duration,
      category,
    });
    const course = await Course.findById(createdCourse._id).populate(
      "category"
    );
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

export async function fetchCourse(req: Request) {
  try {
    await connectDb();

    const courses = await Course.find().populate("category");
    if (courses.length == 0) {
      return Response.json(
        {
          message: "No course found",
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        message: "Courses fetched successfully",
        data: courses,
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

export async function singleCourse(req: Request, id: string) {
  try {
    await connectDb();
    const singleData = await Course.findById(id);
    if (!singleData) {
      return Response.json(
        {
          message: "No course found",
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        message: "Single Course fetched successfully",
        data: singleData,
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

export async function deleteCourse(req: Request, id: string) {
  try {
    await connectDb();

    const deletedCourse = await Course.findByIdAndDelete(id);
    //delete lessons too
    await Lesson.deleteMany({ course: id });
    if (deletedCourse) {
      return Response.json(
        {
          message: "Course deleted successfully",
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

export async function editCourse(req: Request, id: string) {
  try {
    await connectDb();
    const { title, description, price, duration, category } = await req.json();
    const courseExists = await Course.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        duration,
        category,
      },
      { new: true }
    );
    if (!courseExists) {
      return Response.json(
        {
          message: "No course exists",
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        message: "Course updated successfully",
        data: courseExists,
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
