"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";

const metrics = [
  { value: "JEE & NEET", label: "Dedicated focus tracks" },
  { value: "06+ Courses", label: "Structured video syllabus" },
  { value: "50k+ Sessions", label: "Daily active practice loops" },
];

const tenets = [
  {
    num: "01",
    title: "Focused learning paths",
    description: "Every concept is mapped chronologically to JEE & NEET blueprints. Mastery is built layer by layer, starting from foundation lectures up to advanced problem-solving sessions.",
    points: ["Chronological video sequences", "Blueprint-aligned chapters", "Step-by-step concept testing"],
  },
  {
    num: "02",
    title: "Smart revision layers",
    description: "Prep isn't just about reading; it's about quick retrieval. We organize equation summaries, formula sheets, and flagged questions directly on the dashboard for instant recall.",
    points: ["Interactive formula decks", "Flagged problem lists", "Chapter summary revision notes"],
  },
  {
    num: "03",
    title: "Accurate progress loop",
    description: "No gamified score boards or stress-inducing notifications. Just direct, clean metrics that show subject accuracy, timing trends, and targeted next actions.",
    points: ["Pace and accuracy tracking", "Weak concept identification", "No vanity rank notifications"],
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white font-inter text-slate-950">
      {/* Editorial Hero */}
      <section className="relative px-5 pb-16 pt-20 sm:px-8 sm:pb-24 lg:pt-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-start lg:gap-20">
            {/* Left Column: Bold Statement */}
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-700 font-bold">
                [ EST. 2026 / ACADEMIC MISSION ]
              </span>
              <h1 className="mt-6 text-[2.75rem] font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-[4rem] font-jakarta">
                A quiet workspace for deep academic progress.
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-[1.1rem] sm:leading-8">
                JeeNeetPulse brings structured video lessons, precision practice sets, and adaptive progress tracking into a single, high-fidelity environment built specifically for JEE & NEET candidates.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/courses"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-emerald-500 px-6 text-sm font-semibold text-white transition hover:bg-emerald-600"
                >
                  Explore curriculum
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Talk to academic lead
                </Link>
              </div>
            </div>

            {/* Right Column: Monospace Metrics list */}
            <div className="border-t border-slate-200 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#063f39] font-bold block mb-6">
                [ ECOSYSTEM DATA ]
              </span>
              <div className="space-y-8">
                {metrics.map((metric) => (
                  <div key={metric.value} className="border-b border-slate-100 pb-5 last:border-b-0">
                    <p className="text-3xl font-bold tracking-tight text-[#063f39]">
                      {metric.value}
                    </p>
                    <p className="mt-1.5 text-xs uppercase tracking-wider text-slate-500 font-medium">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="bg-[#f8faf9] px-5 py-16 sm:px-8 sm:py-24 border-t border-b border-emerald-100/50">
        <div className="mx-auto max-w-5xl text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-700 font-bold block mb-6">
            [ THE JEENEETPULSE PEDAGOGY ]
          </span>
          <p className="text-xl sm:text-[1.85rem] font-medium leading-relaxed sm:leading-[1.6] text-[#063f39] italic font-interi">
            “Preparation is a marathon, not a sprint. We believe in steady, structured, concept-first practice—free from the clutter of infinite notifications, vanity metrics, and high-pressure dashboards.”
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-600">
              Shiv Narayan Vishnoi, Academic Director
            </span>
          </div>
        </div>
      </section>

      {/* Core Tenets (Thin Column Layout) */}
      <section className="px-5 py-16 sm:px-8 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-700 font-bold">
              [ CORE SYSTEM ]
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl font-jakarta">
              Built around your preparation rhythm.
            </h2>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-3 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80">
            {tenets.map((tenet) => (
              <div key={tenet.num} className="pt-8 lg:pt-0 lg:px-10 first:pl-0 last:pr-0">
                <span className="font-mono text-6xl font-light text-emerald-200/60 select-none block leading-none">
                  {tenet.num}
                </span>
                <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-950 font-jakarta">
                  {tenet.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {tenet.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {tenet.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <span className="text-emerald-600 mt-0.5">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership / Faculty Rows */}
      <section className="px-5 py-16 sm:px-8 sm:py-24 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-slate-200 pb-12">
            <div className="max-w-xl">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-700 font-bold">
                [ FACULTY & ENGINEERING ]
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl font-jakarta">
                Academic integrity meets system engineering.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-600 lg:mb-1">
              Our workspace is built in-house. We don't rely on third-party aggregators; we develop our video streams, testing tools, and note modules to standard.
            </p>
          </div>

          <div className="mt-16 space-y-12">
            {/* Shiv Narayan Vishnoi Row */}
            <div className="grid gap-8 lg:grid-cols-[240px_1fr] items-start border-b border-slate-100 pb-12 last:border-0 last:pb-0">
              <div className="relative h-60 w-full sm:w-60 lg:w-full shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
                <Image
                  src="/sir.jpg"
                  alt="Shiv Narayan Vishnoi"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="lg:pl-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-700 font-bold block mb-1">
                  [ ACADEMIC DIRECTOR ]
                </span>
                <h3 className="text-2xl font-bold text-slate-950 font-jakarta">Shiv Narayan Vishnoi</h3>
                <p className="mt-1 text-sm font-medium text-slate-500">Founder & Academic Lead · 20+ Years JEE/NEET Pedagogy</p>
                <p className="mt-6 text-sm leading-8 text-slate-600 font-medium max-w-3xl italic">
                  "Education is not about pushing students into high-stress silos; it is about clarifying concepts so that they learn to reason. JeeNeetPulse is designed to make standard-class lectures and structured practice sets accessible to every aspirant."
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-slate-500">
                  <span>Focus: Curricular Design & Pedagogy</span>
                  <span className="hidden sm:inline">|</span>
                  <span>Review: Core Study Material</span>
                </div>
              </div>
            </div>

            {/* Richie James Row */}
            <div className="grid gap-8 lg:grid-cols-[240px_1fr] items-start border-b border-slate-100 pb-12 last:border-0 last:pb-0">
              <div className="relative h-60 w-full sm:w-60 lg:w-full shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
                <Image
                  src="/richie1.jpg"
                  alt="Richie James"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="lg:pl-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-700 font-bold block mb-1">
                  [ TECHNICAL LEAD ]
                </span>
                <h3 className="text-2xl font-bold text-slate-950 font-jakarta">Richie James</h3>
                <p className="mt-1 text-sm font-medium text-slate-500">Product Architect & Developer · Full-Stack Systems</p>
                <p className="mt-6 text-sm leading-8 text-slate-600 font-medium max-w-3xl italic">
                  "A student’s digital workspace should be fast, highly responsive, and quiet. I focus on building standard-compliant testing tools, adaptive performance analyses, and seamless lecture-streaming engines that minimize distraction."
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-slate-500">
                  <span>Focus: Low-Latency Streaming & Testing Engines</span>
                  <span className="hidden sm:inline">|</span>
                  <span>Design: Clutter-free UX Systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bespoke Bottom CTA */}
      <section className="px-5 py-20 sm:px-8 sm:py-28 bg-[#063f39] text-white border-t border-emerald-950/20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300">
                [ CURRICULUM ACCESS ]
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl font-jakarta">
                Ready to build your preparation rhythm?
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-emerald-100/75">
                Join our students today and experience a quiet, concept-first dashboard engineered to support consistent daily progress.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:justify-end gap-5">
              <Link
                href="/signup"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-orange-500 px-8 py-4 text-sm font-semibold text-white transition hover:bg-orange-600 shadow-lg shadow-orange-500/10"
              >
                Create free account
              </Link>
              <Link
                href="/courses"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition hover:bg-white/15"
              >
                Browse catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
