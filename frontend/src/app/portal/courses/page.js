"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PortalShell from "../components/PortalShell";

const myClasses = [
  {
    id: "101",
    title: "JEE Advanced 2025 Physics",
    subject: "Physics",
    progress: 65,
    totalChapters: 24,
    completedChapters: 15,
    status: "in-progress",
    nextTopic: "Rotational Mechanics",
    lastAccessed: "2 hours ago",
  },
  {
    id: "102",
    title: "NEET Biology Masterclass",
    subject: "Biology",
    progress: 32,
    totalChapters: 38,
    completedChapters: 12,
    status: "in-progress",
    nextTopic: "Human Reproduction",
    lastAccessed: "1 day ago",
  },
  {
    id: "103",
    title: "JEE Main Chemistry Crash Course",
    subject: "Chemistry",
    progress: 100,
    totalChapters: 15,
    completedChapters: 15,
    status: "completed",
    nextTopic: null,
    lastAccessed: "2 weeks ago",
  },
];

const TABS = [
  { id: "all", label: "All" },
  { id: "in-progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
];

export default function PortalClasses() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (!localStorage.getItem("portal_auth")) {
      router.push("/portal/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return null;

  const filtered = myClasses.filter(
    (c) => activeTab === "all" || c.status === activeTab,
  );

  return (
    <PortalShell activeMenu="courses">
      {/* Page Header */}
      <div className="px-8 pt-14 lg:pt-20 lg:pb-9 border-b border-slate-200/60 bg-[#f8faf9]/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold mb-4">
              Academic Record
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-jakarta leading-tight">
              My Classes
            </h1>
            <p className="mt-4 text-base text-slate-500 max-w-md leading-relaxed">
              {myClasses.length} enrolled programs across{" "}
              {[...new Set(myClasses.map((c) => c.subject))].length} subjects.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1 border border-slate-200/60 p-1 bg-white w-fit h-fit">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="max-w-6xl mx-auto w-full p-8 lg:px-1 lg:py-12">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 items-center px-4 mb-4">
          <p className="col-span-5 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400 font-bold">
            Course
          </p>
          <p className="col-span-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400 font-bold">
            Subject
          </p>
          <p className="col-span-3 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400 font-bold">
            Progress
          </p>
          <p className="col-span-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400 font-bold">
            Status
          </p>
        </div>

        {/* Course Rows */}
        <div className="border-t border-slate-200/60">
          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-sm text-slate-400 font-medium">
                No courses found.
              </p>
            </div>
          )}
          {filtered.map((course) => (
            <Link
              href={`/portal/course/${course.id}`}
              key={course.id}
              className="group grid grid-cols-1 md:grid-cols-12 items-center gap-4 md:gap-0 border-b border-slate-200/60 px-4 py-6 hover:bg-[#f8faf9]/60 transition-colors"
            >
              {/* Title */}
              <div className="col-span-5 flex items-start gap-5">
                <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center bg-white border border-slate-200/60 font-jakarta font-extrabold text-xl text-slate-300 transition group-hover:border-[#063f39] group-hover:text-[#063f39]">
                  {course.title.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold font-jakarta text-slate-900 group-hover:text-[#063f39] transition-colors leading-tight">
                    {course.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-400 font-medium">
                    Last accessed {course.lastAccessed}
                  </p>
                </div>
              </div>

              {/* Subject */}
              <div className="col-span-2">
                <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-slate-500">
                  {course.subject}
                </span>
              </div>

              {/* Progress */}
              <div className="col-span-3 flex flex-col gap-2 max-w-[180px]">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>
                    {course.completedChapters}/{course.totalChapters} chapters
                  </span>
                  <span className="text-slate-800">{course.progress}%</span>
                </div>
                <div className="w-full h-1 bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ${course.progress === 100 ? "bg-emerald-500" : "bg-slate-800 group-hover:bg-[#063f39]"}`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {/* Status */}
              <div className="hidden md:flex col-span-2 justify-start">
                <span
                  className={`font-mono text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 border ${
                    course.status === "completed"
                      ? "text-emerald-700 border-emerald-200 bg-emerald-50"
                      : "text-slate-500 border-slate-200 bg-white"
                  }`}
                >
                  {course.status === "completed" ? "Done" : "Active"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
