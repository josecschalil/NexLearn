"use client";

import { useState } from "react";

const questions = [
  { question: "Is JeeNeetPulse suitable for both JEE and NEET?", answer: "Yes. Courses, tests, questions, and analytics are organised by exam and subject, so you can follow the preparation path relevant to you." },
  { question: "Can I practise without enrolling in a paid course?", answer: "Yes. You can explore free featured lessons and practice resources before choosing a complete course." },
  { question: "What does the performance analysis include?", answer: "Test analysis covers your score, accuracy, time per question, subject performance, and the topics that need more practice." },
  { question: "Can I learn on my phone?", answer: "Yes. The learning experience is responsive across mobile, tablet, and desktop, and your progress stays tied to your account." },
  { question: "Where can I access purchased courses and tests?", answer: "After signing in, open the Student Portal from the navigation to access your enrolled courses, tests, and study materials." },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-[#f8faf9] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.65fr_1.35fr] lg:gap-20">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">FAQ</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-5xl">Questions, meet answers.</h2>
          <p className="mt-5 text-base leading-7 text-slate-600">Everything you need to know before starting your preparation with JeeNeetPulse.</p>
        </div>
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {questions.map((item, index) => {
            const isOpen = open === index;
            return <div key={item.question} className="py-1"><button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-semibold text-slate-900 sm:text-base"><span>{item.question}</span><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 text-lg font-light transition ${isOpen ? "rotate-45 bg-emerald-800 text-white" : "bg-white"}`}>+</span></button><div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}><div className="overflow-hidden"><p className="max-w-2xl pr-10 text-sm leading-7 text-slate-600">{item.answer}</p></div></div></div>;
          })}
        </div>
      </div>
    </section>
  );
}
