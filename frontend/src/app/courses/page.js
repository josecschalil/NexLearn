"use client";

import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/productCard";
import Footer from "../components/Footer";
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
        [course.title, course.description, course.exam_type, course.course_type]
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

  const clearFilters = () => {
    setSelectedExam(null);
    setSelectedType(null);
    setSearchQuery("");
    setSortBy("featured");
  };

  return (
    <main className="bg-[#faf8f4] font-inter text-slate-950">
      <section className="px-4 pb-14 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Courses
                </p>
                <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-3xl">
                  Browse all available courses
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  A clean listing of every program, without the oversized
                  featured layout.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px] lg:w-[28rem]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search courses"
                  className="min-h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950"
                />
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="min-h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none transition focus:border-slate-950"
                >
                  <option value="featured">Featured </option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="validity">Longest validity</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4 sm:gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedExam(null)}
                  className={`rounded-full px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                    !selectedExam
                      ? "bg-slate-950 text-white"
                      : "border border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  All exams
                </button>
                {examFilters.map((exam) => {
                  const active = selectedExam === exam;
                  return (
                    <button
                      key={exam}
                      type="button"
                      onClick={() => setSelectedExam(active ? null : exam)}
                      className={`rounded-full px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                        active
                          ? "bg-slate-950 text-white"
                          : "border border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      {exam}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedType(null)}
                  className={`rounded-full px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                    !selectedType
                      ? "bg-slate-950 text-white"
                      : "border border-slate-200 bg-white text-slate-600"
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
                      className={`rounded-full px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                        active
                          ? "bg-slate-950 text-white"
                          : "border border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}

                {(selectedExam || selectedType || searchQuery) && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="ml-auto rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 transition hover:bg-slate-50"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <ProductCard key={course.id} course={course} />
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-[#fcfbf8] px-6 py-12 text-center text-slate-500 sm:col-span-2 lg:col-span-3 xl:col-span-4">
                  No courses found for the selected filters.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CoursesPage;
