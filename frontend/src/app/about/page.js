"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";

const principles = [
  {
    id: "01",
    title: "Less friction, more focus",
    description:
      "Students should spend less time figuring out where to study and more time actually improving.",
  },
  {
    id: "02",
    title: "Preparation with structure",
    description:
      "Courses, revision, tests, and study resources work better when they support one clear routine.",
  },
  {
    id: "03",
    title: "Progress that stays visible",
    description:
      "Small gains matter. The platform is built to make momentum easier to notice and repeat.",
  },
];

const highlights = [
  "Recorded and structured courses for JEE and NEET preparation",
  "Study materials and revision assets organized for faster review",
  "Test-led workflows that support practice, retention, and confidence",
  "A cleaner student experience designed to reduce preparation noise",
];

const workflow = [
  {
    step: "Start with clarity",
    body: "Choose the right course path, understand what is included, and begin with a more guided plan.",
  },
  {
    step: "Build consistency",
    body: "Move between lessons, study support, and practice without the usual platform clutter.",
  },
  {
    step: "Track improvement",
    body: "Use feedback loops and repeated revision to turn effort into measurable exam readiness.",
  },
];

const team = [
  {
    image: "/sir.jpg",
    name: "Shiv Narayan Vishnoi",
    role: "Founder and Academic Lead",
    summary:
      "Shapes the academic direction with a focus on clear explanation, exam-fit coverage, and reliable preparation systems.",
  },
  {
    image: "/richie1.jpg",
    name: "Richie James",
    role: "Technical Lead",
    summary:
      "Builds the product experience to keep learning flows clean, responsive, and easy to return to every day.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white font-inter text-slate-950">
      <section className="relative overflow-hidden border-b border-slate-100 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.10),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(249,115,22,0.08),_transparent_28%),linear-gradient(180deg,_#ffffff_0%,_#f8fbfa_100%)] px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_360px]">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-800">
                About JeeNeetPulse
              </span>

              <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">
                A calmer, cleaner way to prepare for serious exams.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                JeeNeetPulse brings courses, study support, and exam-focused
                practice into one more intentional workspace for JEE and NEET
                aspirants.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/courses"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Explore courses
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                >
                  Talk to us
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-slate-200 bg-white/90 px-4 py-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Built for
                  </p>
                  <p className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
                    JEE + NEET
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-white/90 px-4 py-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Designed around
                  </p>
                  <p className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
                    Focused routines
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-white/90 px-4 py-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Experience
                  </p>
                  <p className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
                    Student-first
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  What we do
                </p>
                <div className="mt-4 space-y-3">
                  {highlights.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.1rem] bg-[#f8faf9] px-4 py-3 text-sm leading-6 text-slate-600"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-emerald-200 bg-emerald-50/70 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
                  Why it matters
                </p>
                <p className="mt-3 text-sm leading-7 text-emerald-950/80">
                  Good preparation is not only about content quality. It is
                  also about keeping the path clear enough that students can
                  stay consistent for months, not just days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Principles
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
              The product stays modest on purpose.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              We try to remove noise, keep choices understandable, and make the
              next step feel obvious.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {principles.map((item, index) => (
              <div
                key={item.id}
                className={`rounded-[1.75rem] border p-5 shadow-sm ${
                  index === 1
                    ? "border-emerald-200 bg-emerald-50/60"
                    : "border-slate-200 bg-white"
                }`}
              >
                <span className="inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {item.id}
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-2 sm:px-8 sm:py-4">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-[#fcfcfb] p-6 shadow-sm sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
                One preparation loop, not disconnected tools.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600">
              The experience is designed to move naturally from learning to
              revision to practice without feeling crowded.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {workflow.map((item) => (
              <div
                key={item.step}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-5"
              >
                <div className="h-2 w-16 rounded-full bg-gradient-to-r from-emerald-500 to-orange-400" />
                <h3 className="mt-4 text-lg font-semibold text-slate-950">
                  {item.step}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Team
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
                Built by people who care about clarity.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600">
              A compact team combining academic direction and product design to
              make preparation feel more dependable.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-[1.85rem] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[1.25rem] bg-slate-100">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-emerald-700">
                      {member.role}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {member.summary}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 sm:px-8 sm:pb-14">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,_#062f2f_0%,_#0b3f3c_55%,_#14524a_100%)] px-6 py-8 text-white shadow-[0_24px_60px_rgba(6,47,47,.18)] sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                Start learning
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em]">
                Explore a more focused way to prepare.
              </h2>
              <p className="mt-4 text-sm leading-7 text-emerald-50/80">
                Browse the course catalog, find the right path, and study in a
                cleaner environment that respects your attention.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Browse courses
              </Link>
              <Link
                href="/signup"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
