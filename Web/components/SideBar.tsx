import Link from "next/link";
import React from "react";

const SideBar = () => {
  return (
    <aside className="w-64 min-h-screen" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-black/80 backdrop-blur-sm">
        <ul className="space-y-2">
          <li>
            <Link
              href="/manager-dashboard"
              className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-800/60"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/manager-dashboard/profile"
              className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-800/60"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
