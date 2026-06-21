import Link from "next/link";

const Arrow = () => <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>;

export default function PrepareSection() {
  return (
    <section className="bg-[#f8faf9] px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Built around your preparation</span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">A calmer, clearer way to prepare.</h2>
          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">Learn concepts, practise with intent, and understand exactly where to focus next.</p>
        </div>

        <div className="mt-14 grid auto-rows-[minmax(230px,auto)] gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/courses" className="group relative overflow-hidden rounded-[2rem] bg-[#073f39] p-7 text-white shadow-[0_18px_50px_rgba(6,78,69,.15)] sm:p-9 lg:col-span-2">
            <div className="relative z-10 max-w-md">
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-emerald-100">Structured learning</span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">Courses that connect every concept.</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-emerald-100/70">Follow an exam-aligned path with expert instruction, concise notes, and chapter-level practice.</p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200">Explore courses <Arrow /></span>
            </div>
            <div className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full border-[42px] border-emerald-300/10" />
            <div className="absolute bottom-8 right-9 hidden h-28 w-44 rotate-2 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur sm:block">
              <div className="h-2 w-16 rounded-full bg-emerald-200/50" /><div className="mt-4 h-2 w-full rounded-full bg-white/15" /><div className="mt-2 h-2 w-4/5 rounded-full bg-white/15" />
              <div className="mt-5 h-2 w-2/3 rounded-full bg-orange-400" />
            </div>
          </Link>

          <Link href="/featured" className="group rounded-[2rem] border border-emerald-100 bg-emerald-100/70 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-9">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">✦</span>
            <h3 className="mt-8 text-2xl font-semibold tracking-tight text-slate-950">Adaptive practice</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Target weak chapters with handpicked questions and detailed solutions.</p>
            <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800">Start practising <Arrow /></span>
          </Link>

          <Link href="/student-portal" className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-9">
            <div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-xl">◎</span><span className="text-xs font-semibold text-emerald-700">Live insights</span></div>
            <h3 className="mt-8 text-2xl font-semibold tracking-tight text-slate-950">Progress you can see</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Know your accuracy, pace, rank trend, and next best action.</p>
            <div className="mt-7 flex items-end gap-1.5" aria-hidden="true">{[35, 48, 42, 67, 58, 82, 76].map((h, i) => <span key={i} className="w-full rounded-t bg-emerald-600/80" style={{height: `${h}px`}} />)}</div>
          </Link>

          <Link href="/study-materials" className="group relative overflow-hidden rounded-[2rem] bg-[#fff2e8] p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-9 lg:col-span-2">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-orange-200/60 blur-3xl" />
            <div className="relative grid min-h-[260px] items-center gap-8 lg:grid-cols-[1fr_360px]">
              <div className="max-w-xl">
                <span className="inline-flex rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold text-orange-700">Anytime revision</span>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">Notes, questions, and lessons—together.</h3>
                <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600">A growing resource library designed for quick revision without the clutter.</p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-orange-700">Browse materials <Arrow /></span>
              </div>

              <div className="rounded-[1.6rem] border border-white/80 bg-white/65 p-3 shadow-[0_18px_45px_rgba(124,45,18,.10)] backdrop-blur" aria-hidden="true">
                <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-600">Revision desk</p>
                    <p className="mt-1 text-sm font-semibold text-slate-950">Physics · Modern Physics</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">68%</span>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    ["Notes", "12"],
                    ["PYQs", "48"],
                    ["Videos", "06"],
                  ].map(([label, value], index) => (
                    <div key={label} className={`rounded-2xl p-3 ${index === 1 ? "bg-slate-950 text-white" : "bg-white/75 text-slate-950"}`}>
                      <p className={`text-[10px] font-medium ${index === 1 ? "text-slate-300" : "text-slate-500"}`}>{label}</p>
                      <p className="mt-1 text-lg font-semibold tracking-tight">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 rounded-2xl bg-white/80 p-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>Today’s quick revision</span>
                    <span className="text-orange-600">24 min</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    {[
                      ["Formula sheet", "w-11/12"],
                      ["Marked questions", "w-4/5"],
                      ["Concept recap", "w-2/3"],
                    ].map(([label, width]) => (
                      <div key={label} className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-orange-400" />
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-orange-100">
                          <div className={`h-full rounded-full bg-orange-400 ${width}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
