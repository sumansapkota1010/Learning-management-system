import StudentSidebar from "../sidebar/Student-Sidebar";

function StudentDashboard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen bg-gray-900">
      {/* sidebar */}
      <StudentSidebar />
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center justify-between bg-white border-b border-gray-200">
          <div className="flex items-center px-4">
            <button className="text-gray-500 focus:outline-none focus:text-gray-700"></button>
          </div>
          <div className="flex items-center pr-4">
            <button className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l-7-7 7-7m5 14l7-7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export default StudentDashboard;
