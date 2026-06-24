"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ProductCard from "@/app/components/productCard";
import PaymentButton from "@/app/components/PaymentButton";
import Footer from "@/app/components/Footer";
import useAuthentication from "@/hooks/useAuthentication";
import api from "../../services/api";

const getCourseVisual = (course) => {
  if (!course) {
    return "/https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=1125";
  }

  const isNeet = course.exam_type === "NEET";
  const isChapterwise = course.course_type === "Chapter-wise";

  if (isNeet && isChapterwise) {
    return "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=1125";
  }

  if (isNeet) {
    return "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=1125";
  }

  if (isChapterwise) {
    return "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=1125";
  }

  return "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=1125";
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const statItems = (course) => [
  { label: "Hours", value: course.watch_hours },
  { label: "Classes", value: course.classes },
  { label: "Chapters", value: course.chapters },
  { label: "Tests", value: course.tests },
];

const leftFeatures = (course) =>
  [
    course.content_left_1,
    course.content_left_2,
    course.content_left_3,
    course.content_left_4,
  ].filter(Boolean);

const rightFeatures = (course) =>
  [
    course.content_right_1,
    course.content_right_2,
    course.content_right_3,
    course.content_right_4,
  ].filter(Boolean);

const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const { isAuthenticated, userDetails } = useAuthentication();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("user_id");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, []);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const [courseResponse, coursesResponse] = await Promise.all([
          api.get(`/api/courses/${courseId}`),
          api.get("/api/courses"),
        ]);

        setCourse(courseResponse.data);
        setCourses(coursesResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch course data.");
        setLoading(false);
      }
    };

    fetchPageData();
  }, [courseId]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    api
      .get(`/api/userCourses/${userId}`)
      .then((response) => {
        const enrolled = response?.data.courses.some(
          (item) => item.course_id === courseId,
        );
        setIsEnrolled(Boolean(enrolled));
      })
      .catch((fetchError) => {
        console.error("Error fetching user courses:", fetchError);
      });
  }, [courseId, userId]);

  const relatedCourses = useMemo(() => {
    if (!course) {
      return [];
    }

    return courses
      .filter((item) => item.id !== course.id)
      .filter(
        (item) =>
          item.exam_type === course.exam_type ||
          item.course_type === course.course_type,
      )
      .slice(0, 3);
  }, [course, courses]);

  const handleBuyNowClick = () => {
    if (!isEnrolled) {
      setIsCheckoutModalOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="px-4 py-20 text-center text-xl font-semibold text-slate-500">
        Loading course...
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-20 text-center text-xl font-semibold text-red-500">
        {error}
      </div>
    );
  }

  if (!course) {
    return (
      <div className="px-4 py-20 text-center text-xl font-semibold text-slate-500">
        Course not found.
      </div>
    );
  }

  const visual = getCourseVisual(course);
  const discount =
    course.price > 0
      ? Math.round(((course.price - course.current_price) / course.price) * 100)
      : 0;
  const accessItems = [
    { label: "Exam", value: course.exam_type },
    { label: "Format", value: course.course_type },
    { label: "Validity", value: `${course.validity} days` },
  ];

  return (
    <main className="bg-[#faf8f4] font-inter text-slate-950">
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>Courses</span>
            <span>/</span>
            <span className="truncate text-slate-400">{course.title}</span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-6">
              <div className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm">
                <div className="grid gap-0 xl:grid-cols-[380px_minmax(0,1fr)]">
                  <div className="bg-[#f2ede6]">
                    <img
                      src={visual}
                      alt={course.title}
                      className="aspect-[5/4] w-full object-cover"
                    />
                  </div>

                  <div className="p-5 sm:p-7">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                        {course.exam_type}
                      </span>
                      <span className="rounded-full bg-[#f4efe7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                        {course.course_type}
                      </span>
                      {discount > 0 ? (
                        <span className="rounded-full bg-orange-50 px-1 md:px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-700">
                          {discount}% off
                        </span>
                      ) : null}
                    </div>

                    <h1 className="mt-4 text-xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
                      {course.title}
                    </h1>

                    <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-standard">
                      {course.description}
                    </p>

                    <div className="mt-6 border-t border-slate-100 pt-5">
                      <div className="grid grid-cols-4 divide-x divide-slate-200">
                        {statItems(course).map((item) => (
                          <div
                            key={item.label}
                            className="flex min-w-0 flex-col items-center justify-start px-1.5 text-center sm:px-3"
                          >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-[11px]">
                              {item.label}
                            </p>
                            <p className="mt-1 w-full text-center text-sm font-semibold tracking-tight text-slate-950 sm:text-xl">
                              {item.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:hidden">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Enrollment
                </p>

                <div className="mt-4 flex flex-wrap items-end gap-3">
                  <p className="text-3xl font-semibold tracking-tight text-slate-950">
                    Rs.{formatCurrency(course.current_price)}
                  </p>
                  <p className="text-base text-slate-400 line-through">
                    Rs.{formatCurrency(course.price)}
                  </p>
                </div>

                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  {accessItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between rounded-[1rem] bg-[#fcfbf8] px-4 py-3"
                    >
                      <span>{item.label}</span>
                      <span className="font-semibold text-slate-900">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleBuyNowClick}
                  className={`mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-2xl px-5 text-sm font-semibold transition ${
                    isEnrolled
                      ? "cursor-not-allowed bg-slate-200 text-slate-500"
                      : "bg-slate-950 text-white hover:bg-slate-800"
                  }`}
                  disabled={isEnrolled}
                >
                  {isEnrolled ? "Already enrolled" : "Continue to checkout"}
                </button>

                <p className="mt-3 text-center text-xs text-slate-500">
                  Secure enrollment flow with access linked to your student portal.
                </p>
              </div>

              <div className="rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="grid items-start gap-6 lg:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Portions
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                      What this course covers
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      {course.portions}
                    </p>
                  </div>

                  <div className="self-start rounded-[1.3rem] border border-slate-200 bg-[#fcfbf8] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Access
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          Validity
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          {course.validity} days
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          Materials
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          {course.studymaterials} study assets
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Outcomes
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                      Preparation benefits
                    </h2>
                    <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                      {leftFeatures(course).map((item) => (
                        <li
                          key={item}
                          className="rounded-[1rem] bg-[#fcfbf8] px-1 py-1"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Included
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                      Study support
                    </h2>
                    <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                      {rightFeatures(course).map((item) => (
                        <li
                          key={item}
                          className="rounded-[1rem] bg-[#fcfbf8] px-1 py-1"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
              <div className="rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Enrollment
                </p>

                <div className="mt-4 flex flex-wrap items-end gap-3">
                  <p className="text-3xl font-semibold tracking-tight text-slate-950">
                    Rs.{formatCurrency(course.current_price)}
                  </p>
                  <p className="text-base text-slate-400 line-through">
                    Rs.{formatCurrency(course.price)}
                  </p>
                </div>

                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  {accessItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between rounded-[1rem] bg-[#fcfbf8] px-4 py-3"
                    >
                      <span>{item.label}</span>
                      <span className="font-semibold text-slate-900">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleBuyNowClick}
                  className={`mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-2xl px-5 text-sm font-semibold transition ${
                    isEnrolled
                      ? "cursor-not-allowed bg-slate-200 text-slate-500"
                      : "bg-slate-950 text-white hover:bg-slate-800"
                  }`}
                  disabled={isEnrolled}
                >
                  {isEnrolled ? "Already enrolled" : "Continue to checkout"}
                </button>

                <p className="mt-3 text-center text-xs text-slate-500">
                  Secure enrollment flow with access linked to your student
                  portal.
                </p>
              </div>
            </aside>
          </div>

          <div className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  More courses
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                  Related programs
                </h2>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {relatedCourses.length > 0 ? (
                relatedCourses.map((item) => (
                  <ProductCard key={item.id} course={item} />
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-slate-500 sm:col-span-2 xl:col-span-3">
                  No related courses available yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {isCheckoutModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-end bg-slate-950/45 p-4 sm:items-center sm:justify-center sm:p-6">
          <div
            className="absolute inset-0"
            onClick={() => setIsCheckoutModalOpen(false)}
          />

          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-2xl">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Confirm enrollment
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                    Continue with payment?
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-lg text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
                  aria-label="Close payment dialog"
                >
                  X
                </button>
              </div>
            </div>

            <div className="space-y-5 px-5 py-5 sm:px-6 sm:py-6">
              <div className="flex gap-4 rounded-[1.4rem] bg-[#fcfbf8] p-3">
                <img
                  src={visual}
                  alt={course.title}
                  className="h-24 w-24 rounded-[1rem] object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {course.exam_type} | {course.course_type}
                  </p>
                  <h4 className="mt-2 line-clamp-2 text-lg font-semibold tracking-[-0.03em] text-slate-950">
                    {course.title}
                  </h4>
                  <div className="mt-3 flex items-end gap-3">
                    <p className="text-2xl font-semibold tracking-tight text-slate-950">
                      Rs.{formatCurrency(course.current_price)}
                    </p>
                    <p className="text-sm text-slate-400 line-through">
                      Rs.{formatCurrency(course.price)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-sm text-slate-600">
                {accessItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1rem] border border-slate-200 px-3 py-3"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {userId ? (
                <div className="space-y-3">
                  <PaymentButton
                    course={course}
                    userId={userId}
                    userDetails={userDetails}
                    isAuthenticated={isAuthenticated}
                  />
                  <button
                    type="button"
                    onClick={() => setIsCheckoutModalOpen(false)}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="rounded-[1.2rem] bg-[#fcfbf8] px-4 py-4 text-sm leading-6 text-slate-600">
                    Sign in first to continue with course fee payment and link
                    access to your student portal.
                  </p>
                  <Link
                    href="/signin"
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Sign in to continue
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      <Footer />
    </main>
  );
};

export default CoursePage;
