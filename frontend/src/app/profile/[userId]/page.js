"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import useAuthentication from "@/hooks/useAuthentication";
import api from "../../services/api";

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

const navItems = [
  { id: "overview", label: "Overview", icon: "◈" },
  { id: "courses", label: "My Courses", icon: "◉" },
  { id: "account", label: "Account", icon: "◎" },
];

const ProfilePage = () => {
  const router = useRouter();
  const { isAuthenticated, userDetails, loading } = useAuthentication();
  const [coursesData, setCoursesData] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      setCoursesLoading(true);
      api
        .get(`/api/userCourses/${userId}`)
        .then((response) => {
          const courses = response.data.courses || [];
          const coursePromises = courses.map((coursedata) =>
            api.get(`/api/courses/${coursedata.course_id}`),
          );
          return Promise.all(coursePromises);
        })
        .then((courseResponses) => {
          setCoursesData(courseResponses.map((res) => res.data));
          setCoursesLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching course details:", error);
          setCoursesLoading(false);
        });
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8faf9]">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-emerald-600 mx-auto" />
          <p className="mt-4 text-sm text-slate-500 font-inter">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8faf9] px-5 font-inter">
        <div className="max-w-sm w-full text-center rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
          <span className="text-4xl">◎</span>
          <h2 className="mt-4 text-xl font-bold text-slate-950">
            Sign in required
          </h2>
          <p className="mt-2 text-sm text-slate-500 leading-6">
            Please sign in to view your profile and enrolled courses.
          </p>
          <div className="mt-6 flex flex-col gap-3">
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
      </div>
    );
  }

  const initials = userDetails?.name
    ? userDetails.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const totalCourses = coursesData.length;

  return (
    <div className="min-h-screen bg-[#f8faf9] font-inter text-slate-950">
      {/* Mobile top bar */}
      <div className="sticky top-16 z-30 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-5 py-3 backdrop-blur-md lg:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 text-sm"
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <span className="text-sm font-semibold text-slate-950">
          {navItems.find((n) => n.id === activeTab)?.label ?? "Profile"}
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex gap-8 lg:items-start">
          {/* Sidebar */}
          <aside
            className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 overflow-y-auto bg-white border-r border-slate-200 shadow-lg transition-transform duration-300 lg:relative lg:inset-auto lg:z-auto lg:w-56 lg:shadow-none lg:border-0 lg:bg-transparent lg:rounded-2xl ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }`}
          >
            {/* Sidebar overlay close (mobile) */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 z-[-1] bg-black/20 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            <div className="flex flex-col h-full lg:h-auto p-5 lg:rounded-2xl lg:border lg:border-slate-200 lg:bg-white lg:shadow-sm">
              {/* Avatar block */}
              <div className="border-b border-slate-100 pb-5 mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#063f39] text-white text-lg font-bold tracking-tight select-none">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-950">
                      {userDetails?.name || "Student"}
                    </p>
                    <p className="truncate text-xs text-slate-400 mt-0.5">
                      {userDetails?.email || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Nav */}
              <nav className="flex flex-col gap-1 flex-1">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400 mb-2 px-2">
                  [ NAVIGATION ]
                </span>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition text-left ${
                      activeTab === item.id
                        ? "bg-emerald-50 text-emerald-800 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                    }`}
                  >
                    <span
                      className={`text-base ${activeTab === item.id ? "text-emerald-600" : "text-slate-400"}`}
                    >
                      {item.icon}
                    </span>
                    {item.label}
                    {item.id === "courses" && totalCourses > 0 && (
                      <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                        {totalCourses}
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              {/* Quick links */}
              <div className="mt-6 border-t border-slate-100 pt-5 space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400 mb-2 px-2 block">
                  [ QUICK LINKS ]
                </span>
                {[
                  ["Browse courses", "/courses"],
                  ["Student portal", "/mycourses"],
                  ["Study materials", "/study-materials"],
                  ["Contact support", "/contact"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-500 transition hover:bg-slate-50 hover:text-emerald-700"
                  >
                    <span className="text-slate-300">→</span>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="min-w-0 flex-1">
            {/* ── OVERVIEW TAB ── */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-700 font-bold">
                    [ OVERVIEW ]
                  </span>
                  <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl font-jakarta">
                    Welcome back,{" "}
                    {userDetails?.name?.split(" ")[0] || "Student"}.
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">
                    Here's a summary of your academic activity on JeeNeetPulse.
                  </p>
                </div>

                {/* Stats row */}
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      label: "Enrolled courses",
                      value: totalCourses,
                      sub: "active programs",
                      color: "text-[#063f39]",
                      bg: "bg-emerald-50 border-emerald-100",
                    },
                    {
                      label: "Watch hours",
                      value:
                        coursesData.reduce(
                          (a, c) => a + (parseInt(c.watch_hours) || 0),
                          0,
                        ) + "+",
                      sub: "cumulative content",
                      color: "text-orange-700",
                      bg: "bg-orange-50 border-orange-100",
                    },
                    {
                      label: "Total chapters",
                      value: coursesData.reduce(
                        (a, c) => a + (parseInt(c.chapters) || 0),
                        0,
                      ),
                      sub: "across all courses",
                      color: "text-slate-900",
                      bg: "bg-white border-slate-200",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className={`rounded-2xl border p-5 shadow-sm ${stat.bg}`}
                    >
                      <p className="text-xs font-mono uppercase tracking-wider text-slate-500">
                        {stat.label}
                      </p>
                      <p
                        className={`mt-2 text-3xl font-bold tracking-tight ${stat.color}`}
                      >
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">{stat.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Recent courses preview */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-700 font-bold">
                        [ RECENT ENROLLMENT ]
                      </span>
                      <h2 className="mt-1 text-lg font-bold text-slate-950 font-jakarta">
                        Your courses
                      </h2>
                    </div>
                    {totalCourses > 0 && (
                      <button
                        onClick={() => setActiveTab("courses")}
                        className="text-xs font-semibold text-emerald-700 hover:underline"
                      >
                        View all →
                      </button>
                    )}
                  </div>

                  {coursesLoading ? (
                    <div className="space-y-3">
                      {[1, 2].map((i) => (
                        <div
                          key={i}
                          className="h-16 animate-pulse rounded-xl bg-slate-100"
                        />
                      ))}
                    </div>
                  ) : coursesData.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 py-10 text-center">
                      <p className="text-sm text-slate-400">
                        No courses enrolled yet.
                      </p>
                      <Link
                        href="/courses"
                        className="mt-3 inline-flex items-center justify-center rounded-lg bg-emerald-500 px-5 py-2 text-xs font-semibold text-white transition hover:bg-emerald-600"
                      >
                        Browse catalog →
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {coursesData.slice(0, 3).map((course) => (
                        <Link href={`/courses/${course.id}`} key={course.id}>
                          <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-[#f8faf9] p-4 transition hover:border-emerald-100 hover:bg-emerald-50/30">
                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-slate-200">
                              <img
                                src={getCardVisual(course)}
                                alt={course.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold text-slate-950">
                                {course.title}
                              </p>
                              <p className="mt-0.5 text-xs text-slate-400">
                                {course.chapters} chapters ·{" "}
                                {course.watch_hours} hrs · {course.tests} tests
                              </p>
                            </div>
                            <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-800">
                              {course.exam_type}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Info card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-700 font-bold block mb-4">
                    [ ACCOUNT DETAILS ]
                  </span>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { label: "Full name", value: userDetails?.name },
                      { label: "Email address", value: userDetails?.email },
                      { label: "Account type", value: "Student" },
                      { label: "Member since", value: "2026" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="border-b border-slate-100 pb-3 last:border-0"
                      >
                        <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {item.value || "—"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── MY COURSES TAB ── */}
            {activeTab === "courses" && (
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-700 font-bold">
                    [ ENROLLED COURSES ]
                  </span>
                  <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl font-jakarta">
                    My Courses
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">
                    All programs you currently have access to.
                  </p>
                </div>

                {coursesLoading ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-52 animate-pulse rounded-2xl bg-slate-100"
                      />
                    ))}
                  </div>
                ) : coursesData.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-20 text-center shadow-sm">
                    <span className="text-4xl text-slate-300">◉</span>
                    <h3 className="mt-4 text-lg font-bold text-slate-800 font-jakarta">
                      No courses enrolled
                    </h3>
                    <p className="mt-2 text-sm text-slate-400 max-w-xs mx-auto">
                      Browse our JEE & NEET programs and enroll in your first
                      course.
                    </p>
                    <Link
                      href="/courses"
                      className="mt-6 inline-flex items-center justify-center rounded-lg bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
                    >
                      Browse catalog →
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-5 sm:grid-cols-2">
                    {coursesData.map((course) => (
                      <Link
                        href={`/courses/${course.id}`}
                        key={course.id}
                        className="block"
                      >
                        <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:border-emerald-200 hover:shadow-md">
                          {/* Thumbnail */}
                          <div className="relative aspect-[16/7] overflow-hidden bg-slate-100">
                            <img
                              src={getCardVisual(course)}
                              alt={course.title}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            {/* Badges overlaid on image */}
                            <div className="absolute bottom-3 left-3 flex gap-1.5">
                              <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-700 backdrop-blur-sm">
                                {course.exam_type}
                              </span>
                              <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-700 backdrop-blur-sm">
                                {course.course_type}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex flex-1 flex-col p-5">
                            <h3 className="line-clamp-2 text-base font-bold tracking-tight text-slate-950 font-jakarta">
                              {course.title}
                            </h3>
                            <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                              {course.description}
                            </p>

                            {/* Stats row */}
                            <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-4">
                              {[
                                {
                                  icon: "▶",
                                  value: `${course.watch_hours} hrs`,
                                },
                                {
                                  icon: "≡",
                                  value: `${course.chapters} chapters`,
                                },
                                { icon: "◈", value: `${course.tests} tests` },
                              ].map((stat) => (
                                <div
                                  key={stat.value}
                                  className="flex items-center gap-1.5 text-[11px] text-slate-500"
                                >
                                  <span className="text-slate-300 text-[9px]">
                                    {stat.icon}
                                  </span>
                                  {stat.value}
                                </div>
                              ))}
                            </div>

                            {/* CTA */}
                            <div className="mt-4 flex items-center justify-between">
                              <span className="text-xs text-slate-400 font-mono">
                                Active enrollment
                              </span>
                              <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 transition group-hover:bg-emerald-100">
                                Continue →
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Browse more */}
                {coursesData.length > 0 && (
                  <div className="rounded-2xl border border-slate-200 bg-[#f8faf9] p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
                )}
              </div>
            )}

            {/* ── ACCOUNT TAB ── */}
            {activeTab === "account" && (
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-700 font-bold">
                    [ ACCOUNT ]
                  </span>
                  <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl font-jakarta">
                    Account Settings
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">
                    Manage your personal information and account preferences.
                  </p>
                </div>

                {/* Profile identity card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-700 font-bold block mb-5">
                    [ IDENTITY ]
                  </span>
                  <div className="flex items-center gap-5 border-b border-slate-100 pb-6">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#063f39] text-white text-2xl font-bold tracking-tight select-none">
                      {initials}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-950">
                        {userDetails?.name || "—"}
                      </p>
                      <p className="text-sm text-slate-500">
                        {userDetails?.email || "—"}
                      </p>
                      <span className="mt-1 inline-flex items-center rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-800">
                        Student
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 mt-5">
                    {[
                      { label: "Full name", value: userDetails?.name },
                      { label: "Email address", value: userDetails?.email },
                      { label: "Account role", value: "Student" },
                      {
                        label: "Enrolled courses",
                        value: `${totalCourses} program${totalCourses !== 1 ? "s" : ""}`,
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl bg-[#f8faf9] border border-slate-100 p-4"
                      >
                        <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                          {item.label}
                        </p>
                        <p className="mt-1.5 text-sm font-semibold text-slate-900">
                          {item.value || "—"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Support */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-700 font-bold block mb-4">
                    [ SUPPORT ]
                  </span>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Contact academic lead",
                        href: "/contact",
                        desc: "Send a message to our coordination team.",
                      },
                      {
                        label: "Browse course catalog",
                        href: "/courses",
                        desc: "Explore and enroll in new programs.",
                      },
                      {
                        label: "Student portal",
                        href: "/mycourses",
                        desc: "Access your learning dashboard and analytics.",
                      },
                    ].map((item) => (
                      <Link key={item.href} href={item.href}>
                        <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-[#f8faf9] p-4 transition hover:border-emerald-100 hover:bg-emerald-50/30">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {item.label}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-400">
                              {item.desc}
                            </p>
                          </div>
                          <span className="text-slate-400 text-sm">→</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
