"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import PaymentButton from "@/app/components/PaymentButton";
import useAuthentication from "@/hooks/useAuthentication";
import api from "../../services/api";

const getCourseVisual = (course) => {
  if (!course) {
    return "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=1125";
  }

  const isNeet = course.exam_type === "NEET";
  const isChapterwise = course.course_type === "Chapter-wise";

  if (isNeet && isChapterwise) {
    return "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1170";
  }

  if (isNeet) {
    return "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1070";
  }

  if (isChapterwise) {
    return "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1170";
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

const CheckoutPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [userId, setUserId] = useState(null);
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
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/api/courses/${courseId}`);
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch course data.");
        setLoading(false);
      }
    };

    fetchCourse();
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

  if (loading) {
    return (
      <div className="px-4 py-20 text-center text-xl font-semibold text-slate-500">
        Loading checkout...
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

  return (
    <main className="bg-[#faf8f4] font-inter text-slate-950">
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <Link
              href={`/courses/${course.id}`}
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Back to course
            </Link>
            <span>Checkout</span>
            <span>/</span>
            <span className="truncate text-slate-400">{course.title}</span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
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
                        <span className="rounded-full bg-orange-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-700">
                          {discount}% off
                        </span>
                      ) : null}
                    </div>

                    <h1 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
                      Checkout for {course.title}
                    </h1>

                    <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                      Review the course summary and complete your enrollment in one secure step.
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

              <div className="rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      What you are enrolling in
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                      Course overview
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      {course.description}
                    </p>
                  </div>

                  <div className="rounded-[1.3rem] border border-slate-200 bg-[#fcfbf8] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Access
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Validity</p>
                        <p className="mt-1 text-sm text-slate-600">
                          {course.validity} days
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Materials</p>
                        <p className="mt-1 text-sm text-slate-600">
                          {course.studymaterials} study assets
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Price details
                </p>

                <div className="mt-4 flex flex-wrap items-end gap-3">
                  <p className="text-3xl font-semibold tracking-tight text-slate-950">
                    Rs.{formatCurrency(course.current_price)}
                  </p>
                  <p className="text-base text-slate-400 line-through">
                    Rs.{formatCurrency(course.price)}
                  </p>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  One-time enrollment with access added to your student portal after payment.
                </p>

                {!userId ? (
                  <button
                    onClick={() => {
                      toast.error("Sign in to finish enrollment.");
                    }}
                    className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Sign in to continue
                  </button>
                ) : (
                  <div className="mt-6 space-y-5">
                    <div className="rounded-[1.2rem] bg-[#fcfbf8] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        User details
                      </p>
                      <div className="mt-3 space-y-2 text-sm text-slate-600">
                        <p>
                          Name:{" "}
                          <span className="font-semibold text-slate-900">
                            {userDetails?.name}
                          </span>
                        </p>
                        <p>
                          Email:{" "}
                          <span className="font-semibold text-slate-900">
                            {userDetails?.email}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Payment
                      </p>
                      <div className="mt-3">
                        {isEnrolled ? (
                          <div className="rounded-[1rem] bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                            Already enrolled
                          </div>
                        ) : (
                          <PaymentButton
                            course={course}
                            userId={userId}
                            userDetails={userDetails}
                            isAuthenticated={isAuthenticated}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CheckoutPage;
