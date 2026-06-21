"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";


export default function Hero() {
  const contentRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.from(contentRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.from(previewRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.15,
        delay: 0.2,
        ease: "back.out(1.2)",
      });
    });
    return () => context.revert();
  }, []);

  return (
    <section className="relative overflow-hidden bg-white px-6 pb-16 pt-12 sm:px-12 sm:pb-20 lg:pt-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-8">
        
        {/* Left Side: Copy & CTA */}
        <div ref={contentRef} className="max-w-lg">
          <h1 className="text-[3rem] font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-[3.75rem]">
            Master your <br />
            <span className="relative inline-block">
              JEE & NEET
              {/* Hand-drawn style underline */}
              <svg className="absolute -bottom-2 left-0 w-full text-emerald-950" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                <path d="M2 9.5C45.5 3.5 130 -1.5 198 9.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <path d="M15 10.5C65 5 140 2 190 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
              </svg>
            </span>
          </h1>

          <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-[1.05rem] sm:leading-8">
            Structured video lessons, adaptive practice sets, and precision mock tests—everything you need to streamline your preparation and boost your exam confidence.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <button className="w-full rounded-xl bg-emerald-500 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600 sm:w-auto">
              Get Started Free
            </button>
            <button className="w-full rounded-xl border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-50 sm:w-auto">
              Explore Curriculum
            </button>
          </div>

          {/* Stats Row */}
          <div className="mt-12 flex items-center gap-6 border-b border-slate-100 pb-8 sm:gap-10">
            <div>
              <p className="text-3xl font-bold tracking-tight text-slate-950">98.2%</p>
              <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">Average test improvement</p>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div>
              <p className="text-3xl font-bold tracking-tight text-slate-950">~50k</p>
              <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">Active daily students</p>
            </div>
          </div>

          {/* Rating */}
          <div className="mt-5 flex items-center gap-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm font-medium text-slate-500">
              <span className="font-bold text-slate-950">4.9</span> Average student rating
            </p>
          </div>
        </div>

        {/* Right Side: Floating Abstract UI */}
        <div className="relative hidden h-[550px] w-full lg:block">
       <img src="icons/hero.png" alt="Abstract UI" className="absolute inset-0 h-full w-full object-contain" />
        </div>
      </div>
    </section>
  );
}
