"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import { MarketingPage, SectionHeading } from "../components/marketing/PageScaffold";

const values = [
  {
    title: "Clarity over clutter",
    description:
      "We design every lesson, note, and test around what helps students move forward with confidence.",
  },
  {
    title: "Practice with purpose",
    description:
      "Strong preparation comes from targeted repetition, chapter-level feedback, and consistent review.",
  },
  {
    title: "Progress you can feel",
    description:
      "From concept learning to mock tests, the platform is built to make improvement visible and actionable.",
  },
];

const offers = [
  "Structured courses aligned with exam preparation patterns.",
  "Featured video lessons for quick understanding and revision.",
  "Curated study notes and resources for focused review.",
  "Performance-led workflows that keep preparation intentional.",
];

const team = [
  {
    image: "/sir.jpg",
    name: "Shiv Narayan Vishnoi",
    role: "Founder and Academic Lead",
  },
  {
    image: "/richie1.jpg",
    name: "Richie James",
    role: "Technical Lead",
  },
];

export default function AboutPage() {
  return (
    <MarketingPage
      eyebrow="About JeeNeetPulse"
      title="Built to make serious exam preparation feel more focused."
      description="JeeNeetPulse brings together lessons, guided practice, revision resources, and progress tracking so JEE and NEET aspirants can prepare with structure instead of stress."
      accent="emerald"
      actions={[
        { href: "/courses", label: "Explore courses" },
        { href: "/contact", label: "Talk to us", variant: "secondary" },
      ]}
      stats={[
        { value: "All-in-one", label: "Lessons, resources, and practice in one place" },
        { value: "JEE + NEET", label: "Preparation designed for competitive exam flow" },
        { value: "Student-first", label: "Simple experiences that reduce friction" },
      ]}
      footer={<Footer />}
    >
      <section className="pt-4 sm:pt-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading
              eyebrow="Who we are"
              title="A learning platform shaped around momentum."
              description="We focus on helping ambitious students move from scattered preparation to a more deliberate routine with cleaner content, sharper practice, and better visibility into their next step."
            />
            <div className="mt-8 space-y-5 text-sm leading-7 text-slate-600">
              <p>
                Our mission is to support exam aspirants with high-quality
                academic resources, intuitive workflows, and a calmer
                preparation experience.
              </p>
              <p>
                Instead of treating learning, revision, and testing as separate
                journeys, JeeNeetPulse connects them into one system that feels
                easier to return to every day.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#063f39] p-6 text-white shadow-[0_24px_60px_rgba(6,78,69,.18)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
              What we offer
            </p>
            <div className="mt-6 space-y-4">
              {offers.map((offer) => (
                <div
                  key={offer}
                  className="rounded-[1.4rem] border border-white/10 bg-white/10 px-4 py-4 text-sm leading-6 text-emerald-50/85"
                >
                  {offer}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-8 sm:pt-12">
        <SectionHeading
          eyebrow="Principles"
          title="The values behind the product."
          description="A few core ideas guide how we design the learning experience."
          align="center"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`rounded-[2rem] border p-6 shadow-sm ${
                index === 1
                  ? "border-emerald-200 bg-emerald-50/70"
                  : "border-slate-200 bg-white"
              }`}
            >
              <span className="inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                0{index + 1}
              </span>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-8 sm:pt-12">
        <div className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeading
            eyebrow="Team"
            title="The people building the experience."
            description="A small team blending academic direction with product and platform design."
          />
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:justify-center">
            {team.map((member) => (
              <div
                key={member.name}
                className="w-full rounded-[1.75rem] border border-slate-200 bg-[#f8faf9] p-5 text-center shadow-sm sm:max-w-sm"
              >
                <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-950">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-8 sm:pt-12">
        <div className="rounded-[2.25rem] bg-[#063f39] px-6 py-10 text-center text-white shadow-[0_24px_60px_rgba(6,78,69,.2)] sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
            Start here
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Join a more intentional preparation routine.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-emerald-100/75">
            Explore the platform, discover the right course path, and bring your
            preparation into one place.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange-500 px-7 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Create free account
            </Link>
            <Link
              href="/courses"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Browse courses
            </Link>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
