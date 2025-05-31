"use client";

import { fetchMyApprovedEnrollments } from "@/store/enrollment/enrollmentSlice";
import { IEnrollment } from "@/store/enrollment/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { EnrollmentStatus } from "../../../../types/enum";

const StudentEnrollments = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { enrollments, status } = useAppSelector((state) => state.enrollment);

  useEffect(() => {
    dispatch(fetchMyApprovedEnrollments());
  }, [dispatch]);

  const handleCourseClick = (courseId: string) => {
    router.push(`/student/${courseId}/lessons`);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-12 h-12 border-4 border-t-sky-500 border-gray-700 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-300">Loading your courses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 md:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
            My Enrolled Courses
          </h1>
          <p className="mt-3 text-md text-gray-400">
            Access all your approved courses and continue your learning journey.
          </p>
        </header>

        {enrollments.length === 0 && EnrollmentStatus.Approved ? (
          <div className="text-center py-10 bg-gray-800 rounded-xl shadow-lg">
            <svg
              className="mx-auto h-12 w-12 text-sky-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.049 2.927C9.499 2.371 10.216 2 11 2h2c.784 0 1.501.371 1.951.927l1.217 1.46c.13.156.315.243.508.243h1.442c1.037 0 1.882.845 1.882 1.882v9.006c0 1.037-.845 1.882-1.882 1.882H5.882C4.845 19.5 4 18.655 4 17.618V6.512c0-1.037.845-1.882 1.882-1.882h1.442c.193 0 .379-.087.508-.243l1.217-1.46z"
              />
              <path
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12H9m3 3V9"
              />
            </svg>
            <h3 className="mt-2 text-xl font-semibold text-gray-200">
              No Approved Courses Yet
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Once your enrollments are approved, they will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrollments.map((enrollment: IEnrollment) => (
              <div
                onClick={() => handleCourseClick(enrollment.course._id)}
                key={enrollment._id}
                className="bg-gray-800 p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-700 hover:shadow-sky-500/30 hover:scale-[1.03]"
              >
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-sky-500/20 rounded-full mr-3">
                    <svg
                      className="w-6 h-6 text-sky-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v11.494m0 0A2.373 2.373 0 0010.5 17.5H8.625a2.373 2.373 0 00-2.375 2.375V20.25c0 1.494.984 2.75 2.375 2.75H10.5a2.373 2.373 0 002.375-2.375V17.75a2.375 2.375 0 00-.375-.253zM12 6.253H8.625a2.373 2.373 0 00-2.375 2.375V11.5c0 .133.107.24.24.24H14.373c.133 0 .24-.107.24-.24V8.625A2.373 2.373 0 0012 6.253z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-100 group-hover:text-sky-300 transition-colors">
                    {enrollment.course?.title || "Course Title"}
                  </h3>
                </div>
                <p className="text-sm text-gray-400">
                  Enrolled on:{" "}
                  {new Date(enrollment.enrolledAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="mt-4 pt-3 border-t border-gray-700 text-right">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-sky-300 bg-sky-500/10 rounded-full">
                    View Lessons →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentEnrollments;
