import Link from "next/link";

export default function StartLearning() {
  return (
    <section className="bg-[#f8faf9] px-5 pb-16 sm:px-8 sm:pb-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#063f39] px-6 py-12 text-center text-white shadow-[0_24px_60px_rgba(6,78,69,.2)] sm:rounded-[2.5rem] sm:px-12 sm:py-16">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full border-[42px] border-emerald-300/10" /><div className="absolute -bottom-28 -right-20 h-72 w-72 rounded-full border-[50px] border-orange-400/10" />
        <div className="relative mx-auto max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">Your next chapter starts here</span>
          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Build the preparation rhythm your goal deserves.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-emerald-100/70 sm:text-base">Join JeeNeetPulse and bring your lessons, practice, tests, and progress together.</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/signup" className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange-500 px-7 text-sm font-semibold shadow-lg transition hover:-translate-y-0.5 hover:bg-orange-600">Create free account →</Link><Link href="/courses" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 text-sm font-semibold backdrop-blur transition hover:bg-white/15">Explore courses</Link></div>
        </div>
      </div>
    </section>
  );
}
