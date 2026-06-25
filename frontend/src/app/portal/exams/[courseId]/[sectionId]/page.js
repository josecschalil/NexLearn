"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import PortalShell from "../../../components/PortalShell";
import { examCatalog } from "../../data";

export default function PortalExamSectionPage() {
  const router = useRouter();
  const { courseId, sectionId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("portal_auth")) {
      router.push("/portal/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  const courseData = useMemo(
    () => examCatalog[courseId] || examCatalog["101"],
    [courseId]
  );

  const sectionData = useMemo(
    () =>
      courseData.sections.find((section) => section.id === sectionId) ||
      courseData.sections[0],
    [courseData, sectionId]
  );

  if (loading) return null;

  return (
    <PortalShell activeMenu="exams">
      <div className="min-h-screen bg-[#f6f8f7]">
        <div className="border-b border-slate-200/60 bg-[#f8faf9]/50 px-5 py-10 sm:px-8 lg:py-14">
          <div className="mx-auto max-w-6xl">
            <Link
              href={`/portal/exams/${courseId}`}
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 transition hover:text-slate-900"
            >
              <span aria-hidden="true">&larr;</span>
              Back to categories
            </Link>

            <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {courseData.subject} exam listing
                </p>
                <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 font-jakarta md:text-4xl">
                  {sectionData.title}
                </h1>
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  {sectionData.description}
                </p>
              </div>

              <div className="rounded-[1.4rem] border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Total exams
                </p>
                <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 font-jakarta">
                  {sectionData.exams.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-8">
          <div className="grid gap-4 md:grid-cols-2">
            {sectionData.exams.map((exam) => (
              <div
                key={exam.name}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-[0_18px_40px_rgba(15,23,42,.06)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full bg-[#f8faf9] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 ring-1 ring-slate-200">
                    {exam.label}
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Start exam
                  </button>
                </div>

                <h2 className="mt-4 text-xl font-bold leading-tight text-slate-900 font-jakarta">
                  {exam.name}
                </h2>
                <p className="mt-2 text-sm text-slate-500">{exam.meta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
