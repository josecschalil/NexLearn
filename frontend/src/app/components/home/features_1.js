import Link from "next/link";

const subjects = [
  { name: "Physics", score: 84, color: "bg-emerald-600" },
  { name: "Chemistry", score: 76, color: "bg-teal-500" },
  { name: "Mathematics", score: 68, color: "bg-orange-500" },
];

export default function Features_1() {
  return (
    <section className="overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Student analytics
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">
            Turn every test into your next advantage.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Go beyond a score. See accuracy, speed, subject trends, and weak
            concepts in one simple dashboard—then practise what matters most.
          </p>
          <ul className="mt-8 space-y-4 text-sm text-slate-700">
            {[
              "Chapter and subject-level breakdowns",
              "Time and accuracy insights",
              "Personalised practice recommendations",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-700">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/mycourses"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-800"
          >
            Open student portal <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-[3rem] bg-emerald-100/60 blur-3xl" />
          <div className="relative rounded-[2rem] border border-slate-200 bg-[#f8faf9] p-4 shadow-[0_24px_70px_rgba(15,23,42,.11)] sm:p-6">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  JEE Main • Mock test 08
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-950">
                  Performance overview
                </h3>
              </div>
              <span className="w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                Top 8% this week
              </span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-100 bg-white p-4">
                <p className="text-[11px] text-slate-500">Total score</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">
                  224
                  <span className="text-sm font-medium text-slate-400">
                    /300
                  </span>
                </p>
                <p className="mt-2 text-[10px] font-semibold text-emerald-700">
                  ↑ 18 from last test
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-4">
                <p className="text-[11px] text-slate-500">Accuracy</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">
                  78%
                </p>
                <div className="mt-3 h-1.5 rounded-full bg-slate-100">
                  <div className="h-full w-[78%] rounded-full bg-emerald-600" />
                </div>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-4">
                <p className="text-[11px] text-slate-500">Avg. pace</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">
                  1:42
                </p>
                <p className="mt-2 text-[10px] font-medium text-slate-400">
                  minutes / question
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-[1.15fr_.85fr]">
              <div className="rounded-2xl border border-slate-100 bg-white p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-900">
                    Score trend
                  </p>
                  <p className="text-[10px] text-slate-400">Last 7 tests</p>
                </div>
                <div className="mt-6 flex h-32 items-end gap-2 sm:gap-3">
                  {[42, 50, 46, 62, 58, 72, 84].map((height, index) => (
                    <div
                      key={index}
                      className="group flex h-full flex-1 items-end"
                    >
                      <div
                        className={`w-full rounded-t-md ${index === 6 ? "bg-orange-500" : "bg-emerald-100 group-hover:bg-emerald-200"}`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-[9px] text-slate-400">
                  <span>Test 02</span>
                  <span>Test 08</span>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-5">
                <p className="text-xs font-semibold text-slate-900">
                  Subject mastery
                </p>
                <div className="mt-5 space-y-5">
                  {subjects.map((subject) => (
                    <div key={subject.name}>
                      <div className="mb-2 flex justify-between text-[11px]">
                        <span className="font-medium text-slate-600">
                          {subject.name}
                        </span>
                        <span className="font-semibold text-slate-900">
                          {subject.score}%
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${subject.color}`}
                          style={{ width: `${subject.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-orange-100 bg-orange-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-900">
                  Your next focus: Rotational motion
                </p>
                <p className="mt-1 text-[10px] text-slate-500">
                  Accuracy is 14% below your Physics average.
                </p>
              </div>
              <Link
                href="/questions"
                className="text-xs font-semibold text-orange-700"
              >
                Practise now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
