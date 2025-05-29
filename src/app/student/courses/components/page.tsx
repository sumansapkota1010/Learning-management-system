import { ICourse } from "@/store/course/types";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import Modal from "./StudentCourseModal";

function CourseCard({ course }: { course: ICourse }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseId, setCourseId] = useState<string>("");
  const openModal = useCallback((id: string) => {
    setIsModalOpen(true);
    setCourseId(id);
  }, []);

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <div className=" w-75 flex flex-col">
      <div className=" overflow-x-auto">
        {isModalOpen && <Modal closeModal={closeModal} courseId={courseId} />}
        <motion.div
          className="p-4 w-full max-w-sm"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-emerald-500 transition-all duration-300 h-full flex flex-col">
            <div className="relative">
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/90 text-white">
                  {course?.category?.name || "Course"}
                </span>
              </div>
              <div className="h-40 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-80"></div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                {course?.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
                {course?.description.substring(0, 40)}...
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{course?.duration}</span>
                </div>
                <div className="text-sm font-medium text-emerald-400">
                  Rs{course?.price || "Free"}
                </div>
              </div>

              <button
                onClick={() => openModal(course?._id as string)}
                className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center"
              >
                <span>Enroll Now</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CourseCard;
