"use client";

import { fetchCategories } from "@/store/category/categorySlice";
import { Status } from "@/store/category/types";
import { addCourses, resetCourseStatus } from "@/store/course/courseSlice";
import { ICourse } from "@/store/course/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ChangeEvent, useEffect, useState } from "react";

interface IModalProps {
  closeModal: () => void;
}

const Modal: React.FC<IModalProps> = ({ closeModal }) => {
  const [data, setData] = useState<ICourse>({
    title: "",
    description: "",
    price: 0,
    category: "",
    duration: "",
  });

  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);
  const { status } = useAppSelector((state) => state.course);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    } else {
      console.log("No more fetch");
    }
  }, [dispatch]);

  function createCourseHandler(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(addCourses(data));
    closeModal();
    dispatch(resetCourseStatus());

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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, category: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-[1px]" />
      <div className="relative w-full max-w-lg p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Add New Course
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
        <form onSubmit={createCourseHandler} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="e.g. React, Express"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              required
            />
          </div>

          <div className="flex justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Course Price
              </label>
              <input
                type="text"
                name="price"
                onChange={handleChange}
                placeholder="$199"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Course Duration
              </label>
              <input
                type="text"
                name="duration"
                onChange={handleChange}
                placeholder="e.g. 4 weeks"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Course Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              rows={3}
              placeholder="Brief overview of the course..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              onChange={handleCategoryChange}
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
              required
              value={
                typeof data.category === "string"
                  ? data.category
                  : data.category._id
              }
            >
              <option value="" disabled>
                -- Select Category --
              </option>
              {categories.length > 0 &&
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
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
              Add Course
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
