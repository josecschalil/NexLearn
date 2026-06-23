"use client";

import React from "react";
import Link from "next/link";
import StudyMaterials from "@/app/components/student/studym";
import Classes from "@/app/components/student/Contents";
import Footer from "../components/Footer";
import { MarketingPage } from "../components/marketing/PageScaffold";

const resourceHighlights = [
  {
    title: "Featured classes",
    description:
      "Quick-access lessons that help students revisit high-value concepts without hunting through the platform.",
  },
  {
    title: "Revision notes",
    description:
      "Curated materials that support fast refreshers and focused chapter review before practice or exams.",
  },
  {
    title: "One clear flow",
    description:
      "The page now follows the same spacious, rounded, home-page aesthetic for a more cohesive experience.",
  },
];

export default function FeaturedPage() {
  return (
    <MarketingPage
      eyebrow="Resources"
      title="A cleaner library for lessons, notes, and quick revision."
      description="This resource hub now follows the same design language as the home page so students can move from discovery to learning without a visual context switch."
      actions={[
        { href: "/courses", label: "Explore courses" },
        { href: "/student-portal", label: "Open portal", variant: "secondary" },
      ]}
      stats={[
        { value: "Featured", label: "High-signal resources surfaced first" },
        { value: "Fast access", label: "Designed for quicker learning entry points" },
        { value: "Unified", label: "Matches the home-page visual system" },
      ]}
      footer={<Footer />}
    >
      <section className="pt-4 sm:pt-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {resourceHighlights.map((item, index) => (
            <div
              key={item.title}
              className={`rounded-[2rem] border p-6 shadow-sm ${
                index === 0
                  ? "border-emerald-200 bg-emerald-50/70"
                  : index === 1
                    ? "border-orange-200 bg-orange-50/70"
                    : "border-slate-200 bg-white"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                0{index + 1}
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-8 sm:pt-12">
        <Classes />
      </section>

      <section className="pt-8 sm:pt-12">
        <StudyMaterials />
      </section>

      <section className="pt-8 sm:pt-12">
        <div className="rounded-[2.25rem] bg-[#063f39] px-6 py-10 text-white shadow-[0_24px_60px_rgba(6,78,69,.2)] sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                Keep learning
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Move from inspiration to a full study path.
              </h2>
              <p className="mt-4 text-sm leading-7 text-emerald-100/75">
                Featured resources are meant to spark momentum. Step into a
                course or your portal when you are ready to go deeper.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange-500 px-7 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Browse courses
              </Link>
              <Link
                href="/student-portal"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Go to portal
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
