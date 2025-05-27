"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import CourseCard from "./components/page";
import { fetchCourses } from "@/store/course/courseSlice";

function Courses() {
  4;

  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <>
      <div className="flex ">
        {courses.length > 0 &&
          courses.map((course) => {
            return <CourseCard key={course._id} course={course} />;
          })}
      </div>
    </>
  );
}

export default Courses;
