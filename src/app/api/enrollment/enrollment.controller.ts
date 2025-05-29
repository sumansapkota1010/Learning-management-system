import connectDb from "@/database/connection";
import Course from "@/database/models/course.schema";
import Enrollment from "@/database/models/enrollment.schema";

import { PaymentMethod } from "../../../../types/enum";
import Payment from "@/database/models/payment.schema";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

import { NextRequest } from "next/server";
import { studentAuth } from "../../../../middleware/student-auth.middleware";

export async function enrollCourse(req: Request) {
  try {
    await connectDb();
    const response = await studentAuth(req as NextRequest);

    if (response.status === 401) {
      return response;
    }

    const { course, whatsapp, paymentMethod } = await req.json();

    const session = await getServerSession(authOptions);
    console.log(session, "Enroll session");

    const studentId = session?.user._id;

    const enrolledCourse = await Enrollment.create({
      whatsapp,
      course,
      student: studentId,
    });

    const courseData = await Course.findById(course);

    let paymentUrl;

    if (paymentMethod === PaymentMethod.Khalti) {
      const data = {
        return_url: "http://localhost:3000/",
        website_url: "http://localhost:3000/",
        amount: courseData.price * 100,
        purchase_order_id: enrolledCourse._id,
        purchase_order_name: "_orders" + enrolledCourse._id,
      };

      const response = await axios.post(
        "https://dev.khalti.com/api/v2/epayment/initiate/",
        data,
        {
          headers: {
            Authorization: "key 6a90fe9eb5534594a065022ee4ae2d67",
          },
        }
      );
      console.log(response, "Response");
      paymentUrl = response.data.payment_url;

      await Payment.create({
        enrollment: enrolledCourse._id,
        amount: courseData.price,
        paymentMethod: PaymentMethod.Khalti,
      });
    } else {
    }

    return Response.json(
      {
        message: "You enrolled the course",
        data: {
          ...enrolledCourse,
          paymentUrl,
        },
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
