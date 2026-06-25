"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import PortalShell from "../../components/PortalShell";

const courseData = {
  id: "101",
  title: "JEE Advanced 2025 Physics",
  progress: 65,
  modules: [
    {
      id: "m1",
      title: "Module 1: Kinematics",
      classes: [
        {
          id: "c1",
          title: "1D Motion Fundamentals",
          duration: "45:00",
          type: "video",
        },
        {
          id: "c2",
          title: "Projectile Motion",
          duration: "55:20",
          type: "video",
        },
        { id: "c3", title: "Kinematics Assignment 1", type: "document" },
      ],
    },
    {
      id: "m2",
      title: "Module 2: Newton's Laws of Motion",
      classes: [
        {
          id: "c4",
          title: "Free Body Diagrams",
          duration: "42:15",
          type: "video",
        },
        {
          id: "c5",
          title: "Friction and Dynamics",
          duration: "60:00",
          type: "video",
        },
        { id: "c6", title: "NLM Chapter Test", type: "exam" },
      ],
    },
    {
      id: "m3",
      title: "Module 3: Rotational Mechanics",
      classes: [
        {
          id: "c7",
          title: "Moment of Inertia",
          duration: "58:30",
          type: "video",
        },
        {
          id: "c8",
          title: "Torque and Angular Momentum",
          duration: "65:00",
          type: "video",
        },
      ],
    },
  ],
};

const typeIcon = {
  video: "Play",
  document: "Notes",
  exam: "Test",
};

const tabs = ["Overview", "Resources", "Discussion"];

export default function CourseClassroom() {
  const router = useRouter();
  const { courseId } = useParams();
  const [activeClass, setActiveClass] = useState("c7");

  useEffect(() => {
    if (!localStorage.getItem("portal_auth")) {
      router.push("/portal/login");
    }
  }, [router]);

  const allClasses = useMemo(
    () => courseData.modules.flatMap((module) => module.classes),
    [],
  );

  const currentClass =
    allClasses.find((item) => item.id === activeClass) || allClasses[0];

  const currentModule =
    courseData.modules.find((module) =>
      module.classes.some((item) => item.id === activeClass),
    ) || courseData.modules[0];

  const courseOutline = (
    <div className="flex h-full flex-col bg-white">
      <div className="border-b border-slate-200 px-5 py-5">
        <Link
          href="/portal/courses"
          className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 transition hover:text-slate-900"
        >
          <span aria-hidden="true">&larr;</span>
          Back to classes
        </Link>

        <div className="mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Course Outline
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
            {courseData.title}
          </h2>
        </div>

        <div className="mt-5 rounded-[1.2rem] bg-[#f8faf9] px-4 py-4">
          <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            <span>Completion</span>
            <span className="text-[#063f39]">{courseData.progress}%</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-[#063f39]"
              style={{ width: `${courseData.progress}%` }}
            />
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            Keep moving through modules to build steady completion over time.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-100 px-5 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Videos
        </p>
      </div>

      <div
        className="flex-1 overflow-y-auto px-5 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ msOverflowStyle: "none" }}
      >
        <div className="space-y-7">
          {courseData.modules.map((module, index) => (
            <section key={module.id}>
              <div className="mb-3 flex items-center gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
                  {module.title.replace(/^Module \d+:\s*/, "")}
                </h3>
              </div>

              <div className="space-y-2">
                {module.classes.map((item) => {
                  const isCurrent = activeClass === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveClass(item.id)}
                      className={`w-full rounded-[1.2rem] border px-4 py-3 text-left transition ${
                        isCurrent
                          ? "border-slate-900 bg-slate-950 text-white shadow-[0_10px_30px_rgba(15,23,42,.12)]"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-[10px] font-semibold uppercase ${
                            isCurrent
                              ? "bg-white/10 text-emerald-300"
                              : "bg-[#f8faf9] text-slate-500"
                          }`}
                        >
                          {item.type === "video"
                            ? "V"
                            : item.type === "document"
                              ? "D"
                              : "T"}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <p className="min-w-0 pr-1 text-sm font-semibold leading-6">
                              {item.title}
                            </p>
                          </div>

                          <div
                            className={`mt-1 flex items-center gap-2 text-xs ${
                              isCurrent ? "text-slate-300" : "text-slate-500"
                            }`}
                          >
                            <span>{typeIcon[item.type]}</span>
                            {item.duration ? (
                              <span>{item.duration}</span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <PortalShell
      activeMenu="courses"
      sidebarContent={courseOutline}
      sidebarWidthClass="w-[28rem] md:w-[28rem]"
      mobileEyebrow="Course Outline"
      mobileTitle={courseData.title}
    >
      <div className="min-h-screen bg-[#f6f8f7]">
        <div className="mx-auto max-w-[1800px] px-4 py-4 sm:px-6 lg:px-8">
          <div className="mb-4 rounded-[1.8rem] border border-slate-200 bg-white px-5 py-4 shadow-sm sm:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  Classroom
                </p>
                <h1 className="mt-2 truncate text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                  {courseData.title}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-full border border-slate-200 bg-[#f8faf9] px-4 py-2 text-sm font-medium text-slate-600">
                  Course ID: {courseId}
                </div>
                <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600">
                  {currentModule.title.replace(/^Module \d+:\s*/, "")}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              <div className="mx-auto aspect-[16/8.6] w-full max-w-[1320px] bg-slate-100">
                <div className="group relative h-full w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1600"
                    alt="Video frame"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-slate-950/10 to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      type="button"
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#063f39] shadow-2xl transition group-hover:scale-105"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="ml-1 h-8 w-8"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 px-5 py-4 sm:px-6">
                    <div className="rounded-[1.2rem] bg-white/10 px-4 py-3 backdrop-blur-md">
                      <div className="flex items-center gap-4 text-xs font-medium text-white">
                        <span>12:04</span>
                        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
                          <div className="h-full w-1/3 rounded-full bg-emerald-400" />
                        </div>
                        <span>{currentClass.duration || "Resource"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 py-5 sm:px-6 sm:py-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-800">
                    {currentModule.title.replace(/^Module \d+:\s*/, "")}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                    {currentClass.type}
                  </span>
                </div>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
                  {currentClass.title}
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                  Continue the current lesson with a cleaner classroom view,
                  faster access to the full course structure, and learning
                  materials that stay close to the video instead of competing
                  with it.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-5 sm:px-6">
                <div className="flex flex-wrap gap-6">
                  {tabs.map((tab, index) => (
                    <button
                      key={tab}
                      type="button"
                      className={`relative py-4 text-sm font-semibold transition ${
                        index === 0
                          ? "text-slate-950"
                          : "text-slate-400 hover:text-slate-900"
                      }`}
                    >
                      {tab}
                      {index === 0 ? (
                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-slate-950" />
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 px-5 py-5 sm:px-6 sm:py-6 lg:grid-cols-[minmax(0,1fr)_280px]">
                <div>
                  <p className="text-sm leading-7 text-slate-600">
                    In this lecture, we introduce the concept of moment of
                    inertia as the rotational analog of mass. You will learn how
                    to calculate it for discrete particle systems and for common
                    continuous bodies like rods, rings, discs, and spheres.
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      "Definition of rotational inertia",
                      "Parallel axis theorem",
                      "Perpendicular axis theorem",
                      "Calculations for standard uniform bodies",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-[1.2rem] bg-[#f8faf9] px-4 py-4 text-sm text-slate-700"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <aside className="self-start rounded-[1.5rem] border border-slate-200 bg-[#fcfcfb] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Session snapshot
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-[1rem] bg-white px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                        Current item
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {currentClass.title}
                      </p>
                    </div>
                    <div className="rounded-[1rem] bg-white px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                        Duration
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {currentClass.duration || "Attached resource"}
                      </p>
                    </div>
                    <div className="rounded-[1rem] bg-white px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                        Module
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {currentModule.title.replace(/^Module \d+:\s*/, "")}
                      </p>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
