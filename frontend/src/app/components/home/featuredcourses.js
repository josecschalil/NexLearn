"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../services/api";

export default function FeaturedCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const courseIcons = [
  "/icons/icon (1).png",
  "/icons/icon (2).png",
  "/icons/icon (3).png",
];


  useEffect(() => {
    let active = true;
    api.get("/api/courses")
      .then((response) => active && setCourses(response.data.slice(0, 3)))
      .catch((error) => console.error("Failed to fetch courses:", error))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  return (
    <section className="bg-[#f8faf9] px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Exam-ready courses</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">Learn with a plan, not guesswork.</h2>
            <p className="mt-5 text-base leading-7 text-slate-600">Structured courses for JEE and NEET, led by experienced educators.</p>
          </div>
          <Link href="/courses" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-600">Browse all courses <span aria-hidden="true">→</span></Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {loading && [0, 1, 2].map((item) => <div key={item} className="h-[300px] animate-pulse rounded-2xl bg-slate-100" />)}
          {!loading && courses.map((course, idx) => {
            const hasDiscount = Number(course.price) > Number(course.current_price);
            const price = course.current_price ?? course.price;
            
            const cardColors = [
              "from-pink-100 to-pink-50",
              "from-sky-100 to-sky-50",
              "from-amber-100 to-amber-50",
              "from-emerald-100 to-emerald-50",
            ];

            return (
                <Link
  key={course.id}
  href={`/courses/${course.id}`}
  className="group flex h-full flex-col rounded-[2rem] border border-slate-100 bg-white p-2 shadow-sm transition-shadow hover:shadow-md"
>
                {/* Top Colored Section */}
                <div className={`relative flex flex-col overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${cardColors[idx % 4]} p-5 sm:p-6`}>
                  
                  {/* Image on the right */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
  <img
    src={courseIcons[idx % 3]}
    alt=""
    className="h-24 w-24 object-contain opacity-90 transition-transform duration-300 group-hover:scale-105"
  />
</div>

                  {/* Content */}
                  <div className="relative z-10 w-[65%]">
                    <span className="inline-block rounded-full bg-black/5 px-2.5 py-1 text-[10px] font-medium text-slate-800">
                      {course.exam_type || "Recommended"}
                    </span>
                    <h3 className="mt-4 text-[17px] font-bold leading-tight text-slate-900">
                      {course.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-4 text-[11px] leading-relaxed text-slate-700">
                      {course.description || "Learn the fundamentals with structured lessons and practice."}
                    </p>

                    {/* Stats row */}
                    <div className="mt-5 flex flex-wrap items-center gap-3 text-[10px] font-semibold text-slate-800">
                      <span className="flex items-center gap-1.5">
                        <svg className="h-3.5 w-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        120 lessons
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="h-3.5 w-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                        50 tests
                      </span>
                    </div>

                  </div>
                </div>

                {/* Bottom White Section */}
                <div className="flex items-center justify-between px-4 py-3 sm:px-5">
                  <span className="text-[11px] font-medium text-slate-500">
                   <span className="text-[13px] font-bold text-slate-900 ml-0.5">
 Starting from ₹{Math.floor(price)}
</span>
                  </span>
                  <span className="rounded-full bg-slate-950 px-5 py-2 text-[11px] font-semibold text-white transition group-hover:bg-slate-800">
                    Apply
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        {!loading && courses.length === 0 && <div className="mt-12 rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center"><p className="text-sm text-slate-500">Courses are being prepared. Explore the full catalogue for the latest availability.</p><Link href="/courses" className="mt-4 inline-flex text-sm font-semibold text-emerald-700">View course catalogue →</Link></div>}
      </div>
    </section>
  );
}
