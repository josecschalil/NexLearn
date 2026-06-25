"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import api from "../services/api";

const getCardVisual = (course) => {
  const isNeet = course.exam_type === "NEET";
  const isChapterwise = course.course_type === "Chapter-wise";
  if (isNeet && isChapterwise)
    return "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800";
  if (isNeet)
    return "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800";
  if (isChapterwise)
    return "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=800";
  return "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=800";
};

const CourseList = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coursesLoading, setCoursesLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("user_id");
      if (storedUserId) {
        setUserId(storedUserId);
      }
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    setCoursesLoading(true);
    api
      .get(`/api/userCourses/${userId}`)
      .then((response) => {
        const courses = response.data.courses || [];
        const coursePromises = courses.map((courseData) =>
          api.get(`/api/courses/${courseData.course_id}`),
        );
        return Promise.all(coursePromises);
      })
      .then((courseResponses) => {
        if (!courseResponses) return;
        setCoursesData(courseResponses.map((res) => res.data));
        setCoursesLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course details:", error);
        setCoursesLoading(false);
      });
  }, [userId]);

  const isLoggedOut = !loading && !userId;

  const totalChapters = coursesData.reduce(
    (a, c) => a + (parseInt(c.chapters) || 0),
    0,
  );
  const totalHours = coursesData.reduce(
    (a, c) => a + (parseInt(c.watch_hours) || 0),
    0,
  );

  return (
    <main className="min-h-screen bg-white font-inter text-slate-950">
      {/* Page Header */}
      <section className="px-5 pt-12 pb-8 sm:px-8 lg:pt-6 lg:pb-12 border-b border-slate-200">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-700 font-bold mb-3">
                <span className="w-4 h-[1px] bg-emerald-700"></span>
                Student Workspace
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#063f39] font-jakarta">
                My Courses
              </h1>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600 max-w-lg">
                Your learning dashboard. Access active course enrollments, track
                your progress, and continue your preparation.
              </p>
            </div>

            {/* Seamless Stats */}
            {!isLoggedOut && coursesData.length > 0 && (
              <div className="flex gap-8 border-t border-slate-200 pt-6 md:border-t-0 md:pt-0 md:border-l md:pl-8">
                {[
                  {
                    value: String(coursesData.length).padStart(2, "0"),
                    label: "Active Programs",
                  },
                  { value: `${totalHours}+`, label: "Watch Hours" },
                  { value: totalChapters, label: "Total Chapters" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-jakarta">
                      {stat.value}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1.5">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content area */}
      <section className="px-5 py-8 sm:px-8 sm:py-12">
        <div className="mx-auto max-w-7xl">
          {/* Loading state */}
          {loading || (userId && coursesLoading) ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-72 animate-pulse rounded-2xl bg-slate-100"
                />
              ))}
            </div>
          ) : isLoggedOut ? (
            /* Logged out state */
            <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-[#f8faf9] px-6 py-16 text-center shadow-sm">
              <img
                className="mx-auto h-24 w-auto opacity-80"
                src="/reading.png"
                alt="Sign in to continue"
              />
              <h3 className="mt-8 text-xl font-bold tracking-tight text-slate-950 font-jakarta">
                Sign in to access your courses
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-500">
                Your portal keeps enrolled courses and learning progress in one
                place. Sign in to continue.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/signin"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-emerald-500 px-6 text-sm font-semibold text-white transition hover:bg-emerald-600"
                >
                  Sign in
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Browse courses
                </Link>
              </div>
            </div>
          ) : coursesData.length === 0 ? (
            /* Empty state */
            <div className="mx-auto max-w-lg rounded-2xl border border-dashed border-slate-300 bg-[#f8faf9] px-6 py-16 text-center">
              <img
                className="mx-auto h-24 w-auto opacity-80"
                src="/reading.png"
                alt="No courses"
              />
              <h3 className="mt-8 text-xl font-bold tracking-tight text-slate-950 font-jakarta">
                No courses enrolled yet
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-500">
                Browse our JEE & NEET programs and enroll in your first course
                to start your preparation.
              </p>
              <Link
                href="/courses"
                className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg bg-orange-500 px-6 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Browse catalog
              </Link>
            </div>
          ) : (
            /* Course grid */
            <>
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#063f39] font-bold">
                  [ {coursesData.length} PROGRAM
                  {coursesData.length !== 1 ? "S" : ""} ]
                </span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {coursesData.map((course) => (
                  <Link
                    key={course.id}
                    href={`/mycourses/${course.id}`}
                    className="block group"
                  >
                    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-200 hover:border-emerald-200 hover:shadow-[0_14px_40px_rgba(6,78,69,.08)]">
                      {/* Thumbnail */}
                      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                        <img
                          src={getCardVisual(course)}
                          alt={course.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                        {/* Overlaid badges */}
                        <div className="absolute left-3 top-3 flex gap-1.5">
                          <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm">
                            Enrolled
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 flex gap-1.5">
                          {course.exam_type && (
                            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-700 backdrop-blur-sm">
                              {course.exam_type}
                            </span>
                          )}
                          {course.course_type && (
                            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-700 backdrop-blur-sm">
                              {course.course_type}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="line-clamp-2 text-base font-bold tracking-tight text-slate-950 font-jakarta">
                          {course.title}
                        </h3>

                        {course.description && (
                          <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                            {course.description}
                          </p>
                        )}

                        {/* Meta row */}
                        <div className="mt-4 flex items-center gap-4 text-[11px] text-slate-500 border-t border-slate-100 pt-4">
                          <span className="flex items-center gap-1">
                            <span className="text-emerald-500 text-[9px]">
                              ▶
                            </span>
                            {course.watch_hours || 0} hrs
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="text-slate-300 text-[9px]">≡</span>
                            {course.chapters || 0} chapters
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="text-orange-400 text-[9px]">
                              ◈
                            </span>
                            {course.tests || 0} tests
                          </span>
                        </div>

                        {/* CTA */}
                        <div className="mt-auto pt-4 flex items-center justify-between">
                          <span className="text-xs text-slate-400 font-mono">
                            Active
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 transition group-hover:bg-emerald-100">
                            Open course →
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Browse more prompt */}
              <div className="mt-12 rounded-2xl border border-slate-200 bg-[#f8faf9] p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Looking for more programs?
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Browse our full JEE & NEET course catalog.
                    </p>
                  </div>
                  <Link
                    href="/courses"
                    className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 whitespace-nowrap"
                  >
                    Browse catalog
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CourseList;
