"use client";

import { fetchCategories } from "@/store/category/categorySlice";
import { Status } from "@/store/category/types";
import { editCourse, fetchSingleCourse, resetCourseStatus } from "@/store/course/courseSlice";
import { ICourse } from "@/store/course/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

interface IModalProps {
  closeModal: () => void;
  courseId: string;
}

const Editmodal: React.FC<IModalProps> = ({ closeModal, courseId }) => {
  const [data, setData] = useState<ICourse | any>({
    title: "",
    description: "",
    price: 0,
    category: "",
    duration: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useAppDispatch();
  const { status, categories } = useAppSelector((state) => state.category);
  const { status: courseStatus } = useAppSelector((state) => state.course);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await dispatch(editCourse(courseId, {
        title: data.title,
        description: data.description,
        price: data.price,
        category: data.category,
        duration: data.duration
      }));
    } catch (error) {
      console.error("Error editing course:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const course = await dispatch(fetchSingleCourse(courseId));
        console.log("Course by ID", course);
        
        if (!categories || categories.length === 0) {
          dispatch(fetchCategories());
        }
        
        if (course) {
          setData({
            title: course.title,
            description: course.description,
            price: course.price,
            category: typeof course.category === 'object' ? course.category._id : course.category,
            duration: course.duration
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadCourse();
  }, [dispatch, courseId]);

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

  // Effect to handle course status changes
  useEffect(() => {
    if (courseStatus === Status.Success) {
      setLoading(false);
      closeModal();
      dispatch(resetCourseStatus());
    } else if (courseStatus === Status.Error) {
      setLoading(false);
      // Handle error if needed
    }
  }, [courseStatus, closeModal, dispatch]);

  return (
    <div
      id="modal"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/50" />
      <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Edit Course
          </h3>
          <button
            onClick={closeModal}
            id="closeModalButton"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              className="h-4 w-4 inline-block ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Course Title
              </label>
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
                placeholder="e.g. React, Express"
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
                value={data.duration}
                onChange={handleChange}
                placeholder="e.g. 4 weeks"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Course Description
              </label>
              <textarea
                name="description"
                value={data.description}
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
                value={data.category}
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

            <div className="flex justify-end gap-3">
              <button
                id="cancelButton"
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                id="submitUrlButton"
                type="submit"
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600"
                disabled={loading}
              >
                {loading ? "Loading..." : "Edit Course"}
                <svg
                  className="h-4 w-4 inline-block ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editmodal;