"use client";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="flex max-w-md  justify-around mb-6 gap-2 font-semibold  ">
      {/* Bookmarks */}
      <Link
        href="/questions/bookmarked"
        className="flex flex-col items-center p-3 px-4 border hover:border-gray-400 border-gray-200 rounded-xl bg-white text-gray-800 hover:text-teal-900 transition-all duration-100"
      >
        <span className="text-lg ">🔖</span>
        <span className="text-sm ">Bookmarks</span>
      </Link>

      {/* Recommended Problems */}
      <Link
        href="/questions/user-lists"
        className="flex flex-col items-center p-3 px-4 border hover:border-gray-400 border-gray-300 rounded-xl bg-white  text-gray-800 hover:text-teal-900 transition-all duration-100"
      >
        <span className="text-lg ">📋</span>
        <span className="text-sm ">Recommended</span>
      </Link>

      {/* Personal Lists */}
      <Link
        href="/questions/similar"
        className="flex flex-col items-center p-3 px-4 border hover:border-gray-400 border-gray-300 rounded-xl bg-white  text-gray-800 hover:text-teal-900 transition-all duration-100"
      >
        <span className="text-lg">📚</span>
        <span className="text-sm ">Personal Lists</span>
      </Link>
    </aside>
  );
};

export default Sidebar;
