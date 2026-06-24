"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";

const metrics = [
  { value: "JEE + NEET", label: "exam-focused ecosystem" },
  { value: "Courses", label: "structured academic tracks" },
  { value: "Practice", label: "revision and testing support" },
];

export default function AboutPage() {
  return (
    <main className="bg-white font-inter text-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white px-5 pb-16 pt-20 sm:px-8 sm:pb-24 lg:pt-28">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.06),_transparent_45%)]" />
        
        <div className="relative mx-auto max-w-5xl text-center">
          <span className="inline-flex rounded-full bg-emerald-50 border border-emerald-200/60 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-800">
            Our Story & Mission
          </span>
          
          <h1 className="mx-auto mt-6 max-w-4xl text-[2.5rem] font-bold leading-[1.1] tracking-tight text-slate-950 sm:text-[3.5rem]">
            Educating with{" "}
            <span className="relative inline-block">
              clarity
              <svg className="absolute -bottom-1 left-0 w-full text-emerald-500/80" viewBox="0 0 100 10" fill="none" preserveAspectRatio="none">
                <path d="M2 7.5C25.5 3.5 65 -1.5 98 7.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
            , preparing with{" "}
            <span className="relative inline-block">
              purpose
              <svg className="absolute -bottom-1 left-0 w-full text-emerald-500/80" viewBox="0 0 100 10" fill="none" preserveAspectRatio="none">
                <path d="M2 7.5C30 2 70 2 98 7.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
              </svg>
            </span>
            .
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-[1.05rem] sm:leading-8">
            JeeNeetPulse was founded on a simple belief: high-stakes exam preparation shouldn't be chaotic. We design tools and courses that cultivate focus, academic discipline, and deep understanding.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/courses"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-500 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600"
            >
              Explore Video Courses
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Contact Academic Lead
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="px-5 py-12 sm:px-8 sm:py-20 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Academic Philosophy</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Preparation is a marathon, not a sprint.
              </h2>
              <p className="mt-6 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                The journey to cracking JEE and NEET demands more than just memorizing formulas. It requires cognitive stamina, clear mental frameworks, and a calm space to practice.
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                Many platforms overwhelm students with infinite dashboards, noisy notifications, and uncurated material. We take a different route: we build a quiet, concept-first ecosystem that respects your focus and helps you stay consistent.
              </p>
            </div>
            
            <div className="relative rounded-[2rem] border border-slate-200 bg-[#f8faf9] p-8 shadow-sm">
              <div className="absolute -right-2 -top-4 h-12 w-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-serif text-3xl select-none">
                “
              </div>
              <p className="text-base font-medium italic leading-8 text-slate-800">
                "We want to build a platform where a student feels in control. Our design filters out the noise, providing a structured flow of video lectures, well-engineered notes, and adaptive question sets that build core understanding step-by-step."
              </p>
              <div className="mt-6 border-t border-slate-200/60 pt-4 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">The JeeNeetPulse Team</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid (Pillars & Metrics) */}
      <section className="bg-[#f8faf9] px-5 py-16 sm:px-8 sm:py-24 border-t border-b border-slate-100">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Core Foundations</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Designed for Academic Excellence</h2>
            <p className="mt-4 text-sm text-slate-600 sm:text-base">The three pillars that guide everything we build at JeeNeetPulse.</p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Pillar 1: Focused Learning */}
            <div className="group rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm transition hover:shadow-md lg:col-span-2">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 text-sm font-bold border border-emerald-100/60">1</span>
                <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">Methodology</span>
              </div>
              <h3 className="mt-6 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Focused Learning Paths</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base sm:leading-7">
                Our curricula are mapped detail-by-detail to current JEE & NEET blueprints. We organize video courses chronologically by sub-topics, ensuring you master foundational concepts before climbing to complex applications.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Syllabus Mapped", "Structured Modules", "Expert Pedagogy"].map((tag) => (
                  <span key={tag} className="rounded-full bg-[#f8faf9] border border-slate-100 px-3 py-1 text-xs text-slate-600 font-medium">{tag}</span>
                ))}
              </div>
            </div>

            {/* Pillar 2: Smart Revision */}
            <div className="group rounded-[2rem] border border-emerald-100 bg-emerald-50/30 p-8 shadow-sm transition hover:shadow-md">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-emerald-600 text-xl shadow-sm border border-emerald-100/40">✦</span>
              <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-950">Smart Revision</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Resources are organized for immediate recall. Revisit key equations, view formula summary cards, and practice marked questions directly from your dashboard.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 uppercase tracking-wider">Optimized for Recall</span>
            </div>

            {/* Pillar 3: Visible Progress */}
            <div className="group rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm transition hover:shadow-md">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-xl text-orange-600 border border-orange-100/40">◎</span>
              <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-950">Visible Progress</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                A calm, metrics-focused dashboard that showcases accuracy trends, time spent per subject, and daily practice targets, keeping your momentum positive.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-orange-700 uppercase tracking-wider">No Vanity Metrics</span>
            </div>

            {/* Stats Row Bento Card */}
            <div className="group rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm transition hover:shadow-md lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-3">
                {metrics.map((item) => (
                  <div key={item.value} className="rounded-2xl bg-[#f8faf9] p-5 border border-slate-200/40">
                    <p className="text-xl font-bold tracking-tight text-[#063f39]">{item.value}</p>
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.1em] text-slate-500 leading-snug">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership / Faculty Section */}
      <section className="px-5 py-16 sm:px-8 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-slate-100 pb-10">
            <div className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">The Minds Behind NexLearn</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Small team, academic focus.</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-600 sm:text-base">
              NexLearn (JeeNeetPulse) is engineered by academic directors and product specialists who care deeply about educational efficiency and student well-being.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* Shiv Narayan Vishnoi Card */}
            <div className="rounded-[2.5rem] border border-slate-200/80 bg-[#f8faf9] p-6 sm:p-8 flex flex-col justify-between transition hover:-translate-y-0.5 hover:shadow-md duration-300">
              <div>
                <div className="flex items-center gap-5">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
                    <Image
                      src="/sir.jpg"
                      alt="Shiv Narayan Vishnoi"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-950">Shiv Narayan Vishnoi</h3>
                    <p className="mt-1 text-sm font-semibold text-emerald-800">Founder & Academic Lead</p>
                    <p className="mt-1 text-xs text-slate-500">20+ Years JEE/NEET Coaching Experience</p>
                  </div>
                </div>
                <p className="mt-8 text-sm leading-8 text-slate-600 italic font-medium">
                  "Education is not about pushing students into high-stress silos; it is about clarifying concepts so that they learn to reason. JeeNeetPulse is designed to make standard-class lectures and structured practice sets accessible to every aspirant."
                </p>
              </div>
              <div className="mt-8 border-t border-slate-200/60 pt-4 flex items-center justify-between text-xs text-slate-500">
                <span>Focus: Curricular Design & Pedagogy</span>
                <span className="font-semibold text-slate-700">Academic Director</span>
              </div>
            </div>

            {/* Richie James Card */}
            <div className="rounded-[2.5rem] border border-slate-200/80 bg-[#f8faf9] p-6 sm:p-8 flex flex-col justify-between transition hover:-translate-y-0.5 hover:shadow-md duration-300">
              <div>
                <div className="flex items-center gap-5">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
                    <Image
                      src="/richie1.jpg"
                      alt="Richie James"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-950">Richie James</h3>
                    <p className="mt-1 text-sm font-semibold text-emerald-800">Technical Lead</p>
                    <p className="mt-1 text-xs text-slate-500">Full-Stack Architect & Product Developer</p>
                  </div>
                </div>
                <p className="mt-8 text-sm leading-8 text-slate-600 italic font-medium">
                  "A student’s digital workspace should be fast, highly responsive, and quiet. I focus on building standard-compliant testing tools, adaptive performance analyses, and seamless lecture-streaming engines that minimize distraction."
                </p>
              </div>
              <div className="mt-8 border-t border-slate-200/60 pt-4 flex items-center justify-between text-xs text-slate-500">
                <span>Focus: System Engineering & UX</span>
                <span className="font-semibold text-slate-700">Tech Lead</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Adaptive Bottom CTA Section (replicates the landing page's StartLearning styling) */}
      <section className="bg-[#f8faf9] px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#063f39] px-6 py-12 text-center text-white shadow-[0_24px_60px_rgba(6,78,69,.2)] sm:px-12 sm:py-16">
          {/* Circular decorations replicating the home page */}
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full border-[42px] border-emerald-300/10" />
          <div className="absolute -bottom-28 -right-20 h-72 w-72 rounded-full border-[50px] border-orange-400/10" />
          
          <div className="relative mx-auto max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Your next chapter starts here
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Build the preparation rhythm your goal deserves.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-emerald-100/70 sm:text-base">
              Join JeeNeetPulse and bring your lessons, practice, tests, and progress together.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange-500 px-7 text-sm font-semibold shadow-lg transition hover:-translate-y-0.5 hover:bg-orange-600"
              >
                Create free account →
              </Link>
              <Link
                href="/courses"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 text-sm font-semibold backdrop-blur transition hover:bg-white/15"
              >
                Explore courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
