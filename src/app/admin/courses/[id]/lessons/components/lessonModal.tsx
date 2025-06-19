"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addLesson,
  pushToLesson,
  resetLessonStatus,
} from "@/store/lesson/lessonSlice";
import { ILesson, ILessonForData } from "@/store/lesson/types";
import { ChangeEvent, useEffect, useState } from "react";

interface IModalProps {
  closeModal: () => void;
  courseId: string;
}

const Modal: React.FC<IModalProps> = ({ closeModal, courseId }) => {
  const [data, setData] = useState<ILessonForData>({
    course: courseId,
    title: "",
    description: "",
    videoUrl: "",
  });

  const dispatch = useAppDispatch();

  const { status } = useAppSelector((state) => state.lesson);

  function createLessonHandler(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(addLesson(data))
      .then(() => {
        closeModal();
        dispatch(resetLessonStatus());
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(status);
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-[1px]" />
      <div className="relative w-full max-w-lg p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Add Lesson
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={createLessonHandler} className="space-y-5">
      

          <div className="flex justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                title
              </label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Day 1: Introduction to React "
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Video URL
              </label>
              <input
                type="url"
                name="videoUrl"
                onChange={handleChange}
                placeholder="https://youtu.be/GxoRD2_w1Jo"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Lesson Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              rows={3}
              placeholder="Brief overview of the lesson..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              id="submitUrlButton"
              className="px-4 py-2 text-sm font-medium text-white rounded-md bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 flex items-center gap-2"
            >
              Add Lesson
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
