import connectDb from "@/database/connection";
import Course from "@/database/models/course.schema";
import Enrollment from "@/database/models/enrollment.schema";

import { EnrollmentStatus, PaymentMethod } from "../../../../types/enum";
import Payment, { PaymentStatus } from "@/database/models/payment.schema";
import axios from "axios";
import { getServerSession } from "next-auth";

import { studentAuth } from "../../../../middleware/student-auth.middleware";
import { NextRequest } from "next/server";
import { authOptions } from "@/app/lib/auth";

export async function enrollCourse(req: Request) {
  try {
    await connectDb();
    const response = await studentAuth(req as NextRequest);

    if (response.status === 401) {
      return response;
    }

    const { course, whatsapp, paymentMethod } = await req.json();
    const session = await getServerSession(authOptions);
    console.log("Session ma user:", session?.user.id);

    if (!session || !session.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Create enrollment
    const enrolledCourse = await Enrollment.create({
      student: session.user.id,
      course,
      whatsapp,
    });

    const courseData = await Course.findById(course);
    let paymentUrl;
    let pidx;

    if (paymentMethod === PaymentMethod.Khalti) {
      const khaltiRes = await axios.post(
        "https://dev.khalti.com/api/v2/epayment/initiate/",
        {
          return_url: "http://localhost:3000/student/payment/success",
          website_url: "http://localhost:3000/",
          amount: courseData.price * 100,
          purchase_order_id: enrolledCourse._id,
          purchase_order_name: "_orders" + enrolledCourse._id,
        },
        {
          headers: {
            Authorization: "key 6a90fe9eb5534594a065022ee4ae2d67",
          },
        }
      );
      paymentUrl = khaltiRes.data.payment_url;
      pidx = khaltiRes.data.pidx;
      console.log("Khalti PIDX:", pidx);
    }

    // Create payment with pidx
    const paymentRecord = await Payment.create({
      enrollment: enrolledCourse._id,
      amount: courseData.price,
      paymentMethod,
      status: PaymentStatus.Pending,
      pidx: pidx,
    });

    await paymentRecord.save();

    console.log("Payment Record After Creation:", paymentRecord);

    // Update enrollment
    enrolledCourse.payment = paymentRecord._id;

    await enrolledCourse.save();

    return Response.json(
      {
        message: "Enrolled successfully",
        data: {
          ...enrolledCourse.toObject(),
          paymentUrl,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Enrollment error:", err);
    return Response.json({ message: "Enrollment failed" }, { status: 500 });
  }
}

export async function fetchEnrollments(req: Request) {
  try {
    await connectDb();

    const data = await Enrollment.find()
      .populate({
        path: "course",
        model: "Course",
        select: "_id title",
      })
      .populate({
        path: "payment",
        model: "Payment",
        select: "_id amount status",
      })
      .populate({
        path: "student",
        model: "User",
        select: "_id username email",
      })
      .lean();

    if (!data || data.length === 0) {
      return Response.json(
        { message: "No enrollments found" },
        { status: 404 }
      );
    }

    console.log("Sample enrollment:", JSON.stringify(data[0], null, 2));

    return Response.json(
      {
        message: "Enrollments fetched successfully",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return Response.json(
      { message: "Failed to fetch enrollments" },
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

export async function fetchMyEnrollments(req: Request) {
  try {
    await connectDb();

    const response = await studentAuth(req as NextRequest);
    if (response.status === 401) {
      return response;
    }
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const myEnrollment = await Enrollment.find({
      student: session.user.id,
      enrollmentStatus: EnrollmentStatus.Approved,
    }).populate("course");

    if (!myEnrollment || myEnrollment.length === 0) {
      return Response.json(
        { message: "No enrollments found" },
        { status: 404 }
      );
    }
    return Response.json(
      {
        message: "My enrollments fetched successfully",
        data: myEnrollment,
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
