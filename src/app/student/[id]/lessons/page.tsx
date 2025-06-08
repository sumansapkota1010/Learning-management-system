"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchLessons } from "@/store/lesson/lessonSlice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PlayCircleIcon,
  CalendarDaysIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";

export default function Lessons() {
  const params = useParams();
  const courseId = params.id;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const dispatch = useAppDispatch();
  const { lessons } = useAppSelector((state) => state.lesson);

  useEffect(() => {
    if (courseId) {
      setLoading(true);
      dispatch(fetchLessons(courseId as string));
      setLoading(false);
    }
  }, [dispatch, courseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-sky-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-center px-4">
        <VideoCameraIcon className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-red-400 mb-2">
          Failed to Load Lessons
        </h2>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  if (!lessons || lessons.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-center px-4">
        <VideoCameraIcon className="w-16 h-16 text-sky-500 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-300 mb-2">
          No Lessons Available
        </h2>
        <p className="text-gray-400">
          New lessons for this course will appear here soon.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 md:mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 leading-tight">
            Course Lessons
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Explore each lesson to master new skills.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-all duration-300 ease-out hover:shadow-sky-500/30 hover:scale-[1.02] group"
            >
              <div className="aspect-w-16 aspect-h-9 bg-black relative overflow-hidden">
                <iframe
                  src={
                    lesson.videoUrl.includes("embed")
                      ? lesson.videoUrl
                      : lesson.videoUrl.replace("watch?v=", "embed/") +
                        "?modestbranding=1&rel=0&iv_load_policy=3"
                  }
                  className="w-full h-full absolute inset-0"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={lesson.title}
                  loading="lazy"
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <PlayCircleIcon className="w-16 h-16 text-white/80 transform group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2 text-xs text-gray-400">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 font-medium">
                    {lesson?.course?.title || "Lesson"}
                  </span>
                  <div className="flex items-center">
                    <CalendarDaysIcon className="w-3.5 h-3.5 mr-1 text-sky-400" />
                    {lesson?.createdAt
                      ? new Date(lesson.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "N/A"}
                  </div>
                </div>

                <h2 className="text-lg font-semibold text-gray-100 mb-1.5 truncate group-hover:text-sky-300 transition-colors duration-200">
                  {lesson.title}
                </h2>

                <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-4">
                  {lesson.description}
                </p>

                <a
                  href={
                    lesson.videoUrl.includes("embed")
                      ? lesson.videoUrl.replace("embed/", "watch?v=")
                      : lesson.videoUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold text-center text-sky-300 bg-gray-700/50 rounded-lg hover:bg-gray-700 hover:text-white focus:ring-2 focus:outline-none focus:ring-sky-500/70 transition-all duration-300 ease-in-out"
                >
                  Watch on YouTube
                  <PlayCircleIcon className="w-5 h-5 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
