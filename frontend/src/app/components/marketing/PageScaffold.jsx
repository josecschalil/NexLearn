"use client";

import Link from "next/link";

export function MarketingPage({
  eyebrow,
  title,
  description,
  actions = [],
  stats = [],
  accent = "emerald",
  children,
  footer = null,
}) {
  const accentStyles = {
    emerald: {
      surface:
        "from-emerald-50 via-white to-orange-50",
      badge: "bg-emerald-100 text-emerald-800",
      primaryButton: "bg-emerald-500 text-white hover:bg-emerald-600",
      secondaryButton:
        "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
    },
    orange: {
      surface:
        "from-orange-50 via-white to-emerald-50",
      badge: "bg-orange-100 text-orange-700",
      primaryButton: "bg-orange-500 text-white hover:bg-orange-600",
      secondaryButton:
        "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
    },
  };

  const palette = accentStyles[accent] || accentStyles.emerald;

  return (
    <main className="overflow-hidden bg-white font-inter text-slate-950">
      <section className={`relative px-5 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-12`}>
        <div className={`absolute inset-0 bg-gradient-to-b ${palette.surface}`} />
        <div className="absolute left-0 top-8 h-56 w-56 rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="absolute right-0 top-20 h-64 w-64 rounded-full bg-orange-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 px-6 py-10 shadow-[0_22px_70px_rgba(15,23,42,.08)] backdrop-blur-xl sm:rounded-[2.5rem] sm:px-10 sm:py-14">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,.8fr)] lg:items-end">
              <div className="max-w-3xl">
                <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${palette.badge}`}>
                  {eyebrow}
                </span>
                <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
                  {title}
                </h1>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                  {description}
                </p>

                {actions.length > 0 && (
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    {actions.map((action) => (
                      <Link
                        key={action.href}
                        href={action.href}
                        className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition ${action.variant === "secondary" ? palette.secondaryButton : palette.primaryButton}`}
                      >
                        {action.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-5 shadow-sm"
                  >
                    <p className="text-2xl font-semibold tracking-tight text-slate-950">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[#f8faf9] px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="mx-auto max-w-7xl">{children}</div>
      </div>

      {footer}
    </main>
  );
}

export function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const alignment = align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl";

  return (
    <div className={`${alignment} min-w-0`}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 break-words text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
