"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import {
  MarketingPage,
  SectionHeading,
} from "../components/marketing/PageScaffold";
import api from "../services/api";

const CourseList = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

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
      })
      .catch((error) => {
        console.error("Error fetching course details:", error);
      });
  }, [userId]);

  const isLoggedOut = !loading && !userId;

  return (
    <section className="mx-10">
      {loading ? (
        <div className="mt-10 rounded-[1.75rem] bg-[#f8faf9] px-6 py-16 text-center text-slate-500">
          Loading your portal...
        </div>
      ) : isLoggedOut ? (
        <div className="mt-10 rounded-[1.75rem] border border-dashed border-slate-300 bg-[#f8faf9] px-6 py-14 text-center">
          <img
            className="mx-auto h-28 w-auto"
            src="/reading.png"
            alt="Reading"
          />
          <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">
            Sign in to access your portal.
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
            Your portal keeps enrolled courses and learning progress in one
            place. Log in to continue.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/signin"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-500 px-7 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              Sign in
            </Link>
            <Link
              href="/courses"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-7 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Explore courses
            </Link>
          </div>
        </div>
      ) : coursesData.length === 0 ? (
        <div className="mt-10 rounded-[1.75rem] border border-dashed border-slate-300 bg-[#f8faf9] px-6 py-14 text-center">
          <img
            className="mx-auto h-28 w-auto"
            src="/reading.png"
            alt="Reading"
          />
          <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">
            No courses enrolled yet.
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
            Start with the course catalog and your portal will be ready as soon
            as you enroll.
          </p>
          <Link
            href="/courses"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-orange-500 px-7 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Browse courses
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {coursesData.map((course) => (
            <Link key={course.id} href={`/student-portal/${course.id}`}>
              <div className="group h-full rounded-[1.75rem] border border-slate-200 bg-[#f8faf9] p-3 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,.08)]">
                <div className="relative overflow-hidden rounded-[1.3rem]">
                  <img
                    className="aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    src={course.img}
                    alt={course.title}
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                    Enrolled
                  </span>
                </div>

                <div className="px-2 pb-2 pt-5">
                  <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                    {course.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {course.chapters} chapters |{" "}
                    {(+course.classes || 0) +
                      (+course.tests || 0) +
                      (+course.studymaterials || 0)}{" "}
                    learning items
                  </p>
                  <div className="mt-5 inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 shadow-sm">
                    Open course
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default CourseList;
