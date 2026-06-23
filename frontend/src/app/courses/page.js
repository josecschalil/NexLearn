"use client";

import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/productCard";
import Footer from "../components/Footer";
import { SectionHeading } from "../components/marketing/PageScaffold";
import api from "../services/api";

const examFilters = ["JEE", "NEET"];
const typeFilters = ["Chapter-wise", "Class 11th", "Class 12th", "Combined"];

const parseCount = (value) => {
  const match = String(value || "").match(/\d+/);
  return match ? Number(match[0]) : 0;
};

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    let filtered = [...courses];

    if (selectedExam) {
      filtered = filtered.filter((course) => course.exam_type === selectedExam);
    }

    if (selectedType) {
      filtered = filtered.filter(
        (course) => course.course_type === selectedType,
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      filtered = filtered.filter((course) =>
        [course.title, course.description, course.portions, course.exam_type]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query)),
      );
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort(
          (first, second) =>
            Number(first.current_price || 0) -
            Number(second.current_price || 0),
        );
        break;
      case "price-high":
        filtered.sort(
          (first, second) =>
            Number(second.current_price || 0) -
            Number(first.current_price || 0),
        );
        break;
      case "validity":
        filtered.sort(
          (first, second) =>
            Number(second.validity || 0) - Number(first.validity || 0),
        );
        break;
      default:
        filtered.sort(
          (first, second) =>
            parseCount(second.watch_hours) - parseCount(first.watch_hours),
        );
        break;
    }

    return filtered;
  }, [courses, searchQuery, selectedExam, selectedType, sortBy]);

  const activeTags = [selectedExam, selectedType].filter(Boolean);

  const clearFilters = () => {
    setSelectedExam(null);
    setSelectedType(null);
    setSearchQuery("");
    setSortBy("featured");
  };

  return (
    <main className="overflow-x-clip bg-white font-inter text-slate-950">
      <section className="overflow-x-clip bg-[#f8faf9] px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-start">
            <div className="my-8 min-w-0 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
              <SectionHeading
                eyebrow="Catalog"
                title="Browse all available programs."
                description="Search, sort, and compare courses without the extra marketing noise."
              />

              <div className="mt-8 max-w-full overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-gradient-to-r from-white via-emerald-50/40 to-orange-50/40 p-4 xl:hidden">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    {activeTags.length > 0 ? (
                      <div className="flex flex-wrap items-center gap-2">
                        {activeTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-orange-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="block truncate text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Showing all courses
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen((open) => !open)}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
                    aria-expanded={mobileFiltersOpen}
                    aria-controls="mobile-course-filters"
                    aria-label={mobileFiltersOpen ? "Close filters" : "Open filters"}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      className={`h-4 w-4 transition ${mobileFiltersOpen ? "rotate-90" : ""}`}
                      aria-hidden="true"
                    >
                      <path
                        d="M3 5h14"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6 10h8"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                      <path
                        d="M8 15h4"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  {(activeTags.length > 0 || searchQuery) && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600 transition hover:bg-slate-50"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {mobileFiltersOpen ? (
                  <div id="mobile-course-filters" className="mt-4">
                    <label className="block">
                      <span className="sr-only">Search courses</span>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Search courses"
                        className="min-h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400"
                      />
                    </label>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <label className="block">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                          Exam
                        </span>
                        <select
                          value={selectedExam || ""}
                          onChange={(event) =>
                            setSelectedExam(event.target.value || null)
                          }
                          className="mt-2 min-h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-400"
                        >
                          <option value="">All exams</option>
                          {examFilters.map((exam) => (
                            <option key={exam} value={exam}>
                              {exam}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="block">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                          Sort
                        </span>
                        <select
                          value={sortBy}
                          onChange={(event) => setSortBy(event.target.value)}
                          className="mt-2 min-h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-400"
                        >
                          <option value="featured">Featured first</option>
                          <option value="price-low">Price: low to high</option>
                          <option value="price-high">Price: high to low</option>
                          <option value="validity">Longest validity</option>
                        </select>
                      </label>
                    </div>

                    <div className="mt-3 flex max-w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      <button
                        type="button"
                        onClick={() => setSelectedType(null)}
                        className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold transition ${
                          !selectedType
                            ? "bg-slate-950 text-white"
                            : "bg-white text-slate-700 ring-1 ring-slate-200"
                        }`}
                      >
                        All formats
                      </button>
                      {typeFilters.map((type) => {
                        const active = selectedType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setSelectedType(active ? null : type)}
                            className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold transition ${
                              active
                                ? "bg-emerald-600 text-white"
                                : "bg-white text-slate-700 ring-1 ring-slate-200"
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="mt-8 hidden gap-4 rounded-[1.75rem] border border-slate-200/80 bg-gradient-to-r from-white via-emerald-50/40 to-orange-50/40 p-4 xl:grid sm:grid-cols-[minmax(0,1fr)_220px]">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Search courses
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search by title, exam, or portions covered"
                    className="mt-2 min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Sort by
                  </span>
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    className="mt-2 min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-400"
                  >
                    <option value="featured">Featured first</option>
                    <option value="price-low">Price: low to high</option>
                    <option value="price-high">Price: high to low</option>
                    <option value="validity">Longest validity</option>
                  </select>
                </label>
              </div>

              <div className="mt-6 hidden max-w-full flex-wrap items-center gap-2 xl:flex">
                {activeTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-orange-700"
                  >
                    {tag}
                  </span>
                ))}
                {!activeTags.length && !searchQuery ? (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Showing all courses
                  </span>
                ) : null}
                {(activeTags.length > 0 || searchQuery) && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 transition hover:bg-slate-50"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              <div className="mt-10 grid min-w-0 gap-5 sm:grid-cols-2 xl:gap-6 2xl:grid-cols-3">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <ProductCard key={course.id} course={course} />
                  ))
                ) : (
                  <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-[#f8faf9] px-6 py-12 text-center text-slate-500 sm:col-span-2 2xl:col-span-3">
                    No courses found for the selected filters.
                  </div>
                )}
              </div>
            </div>

            <aside className="hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm xl:sticky xl:top-8 xl:block">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Filters
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                Narrow the list.
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Filter by exam and course format to find the right program
                faster.
              </p>

              <div className="mt-8 rounded-[1.5rem] bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Exam focus
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {examFilters.map((exam) => {
                    const active = selectedExam === exam;
                    return (
                      <button
                        key={exam}
                        type="button"
                        onClick={() => setSelectedExam(active ? null : exam)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                          active
                            ? "bg-slate-950 text-white"
                            : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {exam}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 rounded-[1.5rem] bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Course format
                </p>
                <div className="mt-4 grid gap-2">
                  {typeFilters.map((type) => {
                    const active = selectedType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedType(active ? null : type)}
                        className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                          active
                            ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
                            : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-orange-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Snapshot
                </p>
                <div className="mt-4 grid gap-3">
                  <div className="rounded-2xl bg-white/90 px-4 py-3">
                    <p className="text-2xl font-semibold tracking-tight text-slate-950">
                      {filteredCourses.length}
                    </p>
                    <p className="text-sm text-slate-500">
                      Programs matching your filters
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/90 px-4 py-3">
                    <p className="text-2xl font-semibold tracking-tight text-slate-950">
                      {selectedExam || "All"}
                    </p>
                    <p className="text-sm text-slate-500">Current exam scope</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CoursesPage;
