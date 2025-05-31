"use client";

import {
  editEnrollmentStatus,
  fetchEnrollments,
} from "@/store/enrollment/enrollmentSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { useEffect, useState } from "react";
import { EnrollmentStatus } from "../../../../types/enum";

function Enrollments() {
  const { enrollments } = useAppSelector((state) => state.enrollment);

  console.log(enrollments, "Enrollmentsss");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEnrollments());
  }, [dispatch]);

  const handleConfirmEnrollment = (enrollmentId: string) => {
    if (!enrollmentId) {
      console.error("Enrollment ID is required to confirm enrollment.");
      return;
    }
    dispatch(editEnrollmentStatus(enrollmentId, EnrollmentStatus.Approved))
      .then(() => {
        dispatch(fetchEnrollments());
      })
      .catch((error) => {
        console.error("Error confirming enrollment:", error);
      });
  };

  const handleRejectEnrollment = (enrollmentId: string) => {
    if (!enrollmentId) {
      console.error("Enrollment ID is required to reject enrollment.");
      return;
    }
    dispatch(editEnrollmentStatus(enrollmentId, EnrollmentStatus.Rejected))
      .then(() => {
        dispatch(fetchEnrollments());
      })
      .catch((error) => {
        console.error("Error rejecting enrollment:", error);
      });
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="relative text-gray-500 focus-within:text-gray-900 mb-4">
            <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z"
                  stroke="#9CA3AF"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z"
                  stroke="black"
                  strokeOpacity="0.2"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z"
                  stroke="black"
                  strokeOpacity="0.2"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex justify-content-between">
              <input
                type="text"
                id="default-search"
                className="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                placeholder="Search for company"
              />
            </div>
          </div>

          <div className="overflow-hidden">
            <table className="min-w-full rounded-xl">
              <thead>
                <tr className="bg-gray-50">
                  <th
                    scope="col"
                    className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
                  >
                    {" "}
                    Student Id
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                  >
                    {" "}
                    Course
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                  >
                    {" "}
                    EnrolledAt
                  </th>

                  <th
                    scope="col"
                    className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                  >
                    EnrollmentStatus
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                  >
                    {" "}
                    Whatsapp
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                  >
                    {" "}
                    Payment Status
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
                  >
                    {" "}
                    Actions{" "}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {enrollments.length > 0 &&
                  enrollments.map((enrollment) => {
                    return (
                      <tr
                        key={enrollment?._id}
                        className="bg-white transition-all duration-500 hover:bg-gray-50"
                      >
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {enrollment.student?._id ? (
                            enrollment.student._id
                          ) : (
                            <span className="text-red-500">
                              No student data
                            </span>
                          )}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {enrollment?.course.title}{" "}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {enrollment?.enrolledAt}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {enrollment?.enrollmentStatus}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {enrollment?.whatsapp}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {enrollment?.payment.status}
                        </td>
                        <td className="p-5">
                          <div className="flex items-center gap-1">
                            {/* Confirm Button (Checkmark) */}
                            <button
                              onClick={() =>
                                handleConfirmEnrollment(enrollment._id)
                              }
                              className="p-2 rounded-full hover:bg-green-100 transition-colors duration-200"
                            >
                              <svg
                                width={20}
                                height={20}
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="fill-green-500"
                                  d="M7.5 13.75L3.75 10L2.5 11.25L7.5 16.25L17.5 6.25L16.25 5L7.5 13.75Z"
                                />
                              </svg>
                            </button>

                            {/* Cancel Button (Cross/X) */}
                            <button
                              onClick={() =>
                                handleRejectEnrollment(enrollment._id)
                              }
                              className="p-2 rounded-full hover:bg-red-100 transition-colors duration-200"
                            >
                              <svg
                                width={20}
                                height={20}
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="stroke-red-500"
                                  d="M5 5L15 15M5 15L15 5"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Enrollments;
