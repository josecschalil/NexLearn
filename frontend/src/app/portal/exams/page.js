"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PortalShell from "../components/PortalShell";

const courseExamCatalog = [
  {
    id: "101",
    title: "JEE Advanced 2025 Physics",
    subject: "Physics",
    totalExams: 8,
    nextExam: "Module 3 cumulative test",
    modules: 3,
  },
  {
    id: "102",
    title: "NEET Biology Masterclass",
    subject: "Biology",
    totalExams: 11,
    nextExam: "Human physiology unit test",
    modules: 4,
  },
  {
    id: "103",
    title: "JEE Main Chemistry Crash Course",
    subject: "Chemistry",
    totalExams: 6,
    nextExam: "Organic revision assessment",
    modules: 2,
  },
];

export default function PortalExamsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [accessCode, setAccessCode] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("portal_auth")) {
      router.push("/portal/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (!modalOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  if (loading) return null;

  return (
    <PortalShell activeMenu="exams">
      <div className="min-h-screen bg-[#f6f8f7]">
        <div className="border-b border-slate-200/60 bg-[#f8faf9]/60 px-5 py-10 sm:px-8 lg:py-14">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Examination Center
                </p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 font-jakarta md:text-5xl">
                  Course exams, kept organized.
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-500">
                  Open any enrolled course to browse exams grouped by modules,
                  units, or broader cumulative assessments.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              >
                Enter proctored exam
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-8">
          <div className="flex items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Course-based exams
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                Browse by course
              </h2>
            </div>
            <div className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 sm:inline-flex">
              {courseExamCatalog.length} active courses
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {courseExamCatalog.map((course) => (
              <Link
                key={course.id}
                href={`/portal/exams/${course.id}`}
                className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_18px_40px_rgba(15,23,42,.06)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] border border-slate-200 bg-[#f8faf9] text-sm font-bold uppercase text-[#063f39] font-jakarta">
                    {course.subject.slice(0, 2)}
                  </div>
                  <span className="rounded-full bg-[#f8faf9] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 ring-1 ring-slate-200">
                    {course.subject}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold leading-tight text-slate-900 font-jakarta transition group-hover:text-[#063f39]">
                  {course.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Next scheduled exam:
                  <span className="ml-1 font-semibold text-slate-700">
                    {course.nextExam}
                  </span>
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-[1rem] bg-[#f8faf9] px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Exams
                    </p>
                    <p className="mt-2 text-lg font-bold text-slate-950">
                      {course.totalExams}
                    </p>
                  </div>
                  <div className="rounded-[1rem] bg-[#f8faf9] px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Modules
                    </p>
                    <p className="mt-2 text-lg font-bold text-slate-950">
                      {course.modules}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {modalOpen ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,.18)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Proctored examination
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                    Enter access code
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Use the exam code provided by your institution to unlock a
                    scheduled proctored test.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                  aria-label="Close modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-6 rounded-[1.4rem] border border-slate-200 bg-[#fcfcfb] px-4 py-2">
                <input
                  type="text"
                  value={accessCode}
                  onChange={(event) => setAccessCode(event.target.value)}
                  placeholder="Enter Access code"
                  className="mt-3 w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-300"
                />

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="hidden md:block inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </PortalShell>
  );
}
