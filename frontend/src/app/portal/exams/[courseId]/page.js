"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import PortalShell from "../../components/PortalShell";
import { examCatalog } from "../data";

export default function PortalCourseExamsPage() {
  const router = useRouter();
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("portal_auth")) {
      router.push("/portal/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  const data = useMemo(
    () => examCatalog[courseId] || examCatalog["101"],
    [courseId],
  );

  if (loading) return null;

  return (
    <PortalShell activeMenu="exams">
      <div className="min-h-screen bg-[#f6f8f7]">
        <div className="border-b border-slate-200/60 bg-[#f8faf9]/50 px-5 py-10 sm:px-8 lg:py-14">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/portal/exams"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 transition hover:text-slate-900"
            >
              <span aria-hidden="true">&larr;</span>
              Back to exams
            </Link>

            <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {data.subject} examinations
                </p>
                <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 font-jakarta md:text-4xl">
                  {data.courseTitle}
                </h1>
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  Choose an exam category first. Each category opens its own
                  page with the corresponding tests listed in a cleaner flow.
                </p>
              </div>

              <div className="rounded-[1.4rem] border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Sections available
                </p>
                <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 font-jakarta">
                  {data.sections.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-8">
          <div className="grid gap-5 md:grid-cols-2">
            {data.sections.map((section) => (
              <Link
                key={section.id}
                href={`/portal/exams/${courseId}/${section.id}`}
                className="group rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_18px_40px_rgba(15,23,42,.06)] sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full bg-[#f8faf9] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 ring-1 ring-slate-200">
                    Exam category
                  </span>
                  <span className="text-sm font-semibold text-[#063f39] transition group-hover:text-slate-950">
                    Open
                  </span>
                </div>

                <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950 transition group-hover:text-[#063f39]">
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {section.description}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-[1rem] bg-[#f8faf9] px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Exams inside
                    </p>
                    <p className="mt-2 text-lg font-bold text-slate-950">
                      {section.exams.length}
                    </p>
                  </div>
                  <div className="rounded-[1rem] bg-[#f8faf9] px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      First label
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      {section.exams[0]?.label || "Available"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
