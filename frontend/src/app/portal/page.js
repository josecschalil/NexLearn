"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PortalShell from "./components/PortalShell";

// Mock Data
const activeCourses = [
  {
    id: "101",
    title: "JEE Advanced 2025 Physics",
    progress: 65,
    chapters: 24,
    nextTopic: "Rotational Mechanics",
  },
  {
    id: "102",
    title: "NEET Biology Masterclass",
    progress: 32,
    chapters: 38,
    nextTopic: "Human Reproduction",
  },
];

const quickStats = [
  {
    label: "Active courses",
    value: "2",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path
          d="M4 7.5 12 4l8 3.5M4 7.5V16.5L12 20m-8-12.5L12 11m8-3.5V16.5L12 20m0-9v9"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Hours this week",
    value: "8.5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path
          d="M12 7.5v5l3 1.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Next milestone",
    value: "3",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path
          d="M5 16.5 9 12.5l3 2.5 7-7M19 8h-3.5V4.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const focusItems = [
  "Complete the current physics lecture and notes",
  "Revise one biology chapter before the weekend",
  "Keep daily study rhythm uninterrupted",
];

export default function PortalDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth
    if (!localStorage.getItem("portal_auth")) {
      router.push("/portal/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return null;

  return (
    <PortalShell activeMenu="dashboard">
      {/* Header Banner - Editorial Style */}
      <div className="border-b border-slate-200/60 bg-[#f8faf9]/50 px-8 py-10 lg:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Student Overview
              </p>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 font-jakarta md:text-5xl">
                Welcome back, <span className="text-[#063f39]">John</span>.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-500">
                You are in a strong study rhythm. Two active programs are in
                progress, and your next session is already lined up so you can
                continue without losing momentum.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 lg:w-[360px]">
              {quickStats.map((item) => (
                <div
                  key={item.label}
                  className="flex aspect-square flex-col items-center justify-center rounded-[1.1rem] border border-slate-200/80 bg-white/95 p-3 text-center shadow-sm"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-[0.95rem] border border-slate-200 bg-[#f8faf9] text-[#063f39]">
                    {item.icon}
                  </div>
                  <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-2 text-lg font-extrabold tracking-tight text-slate-900 font-jakarta sm:text-xl">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 pt-5">
        <div className="mx-auto max-w-6xl">
          {/* Up Next Section */}
          <section>
            <div className="flex items-center gap-4 border-b border-slate-200/60 pb-3">
              <h2 className="text-xs font-bold font-mono uppercase tracking-[0.2em] text-slate-800">
                Up Next
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_320px]">
              <div
                className="grid gap-6 rounded-[1.7rem] border border-slate-200/70 bg-white p-5 shadow-sm sm:grid-cols-[minmax(0,1fr)_240px] lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8 lg:p-6 group cursor-pointer"
                onClick={() => router.push("/portal/course/101")}
              >
                <div className="flex flex-col justify-center">
                  <span className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#063f39]">
                    Continue learning
                  </span>
                  <h3 className="text-3xl font-extrabold font-jakarta leading-tight text-slate-900">
                    Rotational Mechanics: Moment of Inertia
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-500">
                    Continue your strongest ongoing track in physics and move
                    one step closer to finishing the rotational mechanics
                    module.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-6">
                    <div className="flex-1 max-w-[220px]">
                      <div className="mb-2 flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <span>Progress</span>
                        <span className="text-slate-800">65%</span>
                      </div>
                      <div className="h-1 overflow-hidden bg-slate-100">
                        <div className="h-full w-[65%] bg-[#063f39]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative aspect-video w-full self-center overflow-hidden rounded-[1.5rem] border border-slate-200/60 bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800"
                    alt="Physics"
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-slate-900/10 transition duration-500 group-hover:bg-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#063f39] transition-transform duration-500 group-hover:scale-110 shadow-2xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="ml-1 h-6 w-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="rounded-[1.7rem] border border-slate-200/70 bg-white p-5 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Focus today
                </p>
                <div className="mt-5 space-y-3">
                  {focusItems.map((item, index) => (
                    <div
                      key={item}
                      className="rounded-[1.15rem] bg-[#f8faf9] px-4 py-3"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                        0{index + 1}
                      </p>
                      <p className="mt-1.5 text-sm leading-6 text-slate-700">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </section>

          {/* Active Courses List (Minimalist) */}
          <section>
            <div className="flex flex-col gap-3 mb-8 border-b border-slate-200/60 pb-4 mt-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xs font-bold font-mono uppercase tracking-[0.2em] text-slate-800">
                  Your Enrollments
                </h2>
                <p className="mt-3 text-sm text-slate-500 max-w-lg">
                  Keep an eye on active programs and return quickly to the next
                  topic that needs your attention.
                </p>
              </div>
              <Link
                href="/portal/courses"
                className="text-sm font-semibold text-slate-600 transition hover:text-[#063f39]"
              >
                View all classes
              </Link>
            </div>

            <div className="flex flex-col border-t border-l border-r border-slate-200/60 bg-white">
              {activeCourses.map((course, idx) => (
                <Link
                  href={`/portal/course/${course.id}`}
                  key={course.id}
                  className="group border-b border-slate-200/60 p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-[#f8faf9] transition-colors"
                >
                  <div className="flex items-start gap-6 w-full md:w-1/2">
                    <div className="hidden sm:flex h-12 w-12 items-center justify-center bg-slate-50 text-slate-400 font-jakarta font-bold text-lg border border-slate-200/60 transition group-hover:border-[#063f39] group-hover:text-[#063f39]">
                      {course.title.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-jakarta text-slate-900 group-hover:text-[#063f39] transition-colors">
                        {course.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400 uppercase tracking-widest font-semibold">
                        {course.chapters} Chapters
                      </p>
                      <p className="mt-3 text-sm text-slate-500">
                        Next topic:{" "}
                        <span className="font-semibold text-slate-700">
                          {course.nextTopic}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 md:mt-0 w-full md:w-1/3 flex flex-col items-start">
                    <div className="w-full max-w-[200px]">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        <span>Completion</span>
                        <span className="text-slate-800">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full h-1 bg-slate-100 overflow-hidden">
                        <div
                          className="bg-slate-800 h-full transition-all duration-1000 group-hover:bg-[#063f39]"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PortalShell>
  );
}
