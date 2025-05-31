"use client";

import { fetchMyApprovedEnrollments } from "@/store/enrollment/enrollmentSlice";
import { IEnrollment } from "@/store/enrollment/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

const studentEnrollments = () => {
  const dispatch = useAppDispatch();
  const { enrollments, status } = useAppSelector((state) => state.enrollment);

  useEffect(() => {
    dispatch(fetchMyApprovedEnrollments());
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Approved Courses</h2>
      {enrollments.length === 0 ? (
        <p>You have no approved enrollments</p>
      ) : (
        <div className="grid gap-4">
          {enrollments.map((enrollment: IEnrollment) => (
            <div key={enrollment._id} className="p-4 border rounded-lg">
              <h3 className="text-xl font-semibold">
                {enrollment.course?.title}
              </h3>
              <p>
                Enrolled on:{" "}
                {new Date(enrollment.enrolledAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default studentEnrollments;
