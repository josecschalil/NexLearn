"use client";

import { useEffect, useRef, useState } from "react";

const proof = [
  { count: 2000, suffix: "+", label: "Expert video lessons" },
  { count: 80000, suffix: "+", label: "Curated questions" },
  { count: 3000, suffix: "+", label: "Study resources" },
  { count: 3, suffix: "", label: "Top entrance exams" },
];

function Counter({ count, suffix }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const startedAt = performance.now();
      const duration = 900;
      const tick = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        setDisplay(Math.floor(count * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.4 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [count]);

  return <span ref={ref}>{display.toLocaleString("en-IN")}{suffix}</span>;
}

export default function Sections() {
  return (
    <section className="border-y border-slate-100 bg-white px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Everything you need to move from learning to mastery
        </p>
        <div className="mt-9 grid grid-cols-2 gap-y-8 divide-x divide-slate-100 lg:grid-cols-4">
          {proof.map((item) => (
            <div key={item.label} className="px-3 text-center sm:px-6">
              <p className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                <Counter count={item.count} suffix={item.suffix} />
              </p>
              <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
