import Link from "next/link";

const groups = [
  { title: "Learn", links: [["Courses", "/courses"], ["Featured lessons", "/featured"], ["Study materials", "/study-materials"], ["Question bank", "/questions"]] },
  { title: "Company", links: [["About us", "/about"], ["Contact", "/contact"], ["Register", "/signup"], ["Sign in", "/signin"]] },
  { title: "Student", links: [["Student portal", "/student-portal"], ["Featured resources", "/featured"], ["Courses", "/courses"], ["Create account", "/signup"]] },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-14 font-inter sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Link href="/"><img src="/logo.svg" className="h-5 w-auto" alt="JeeNeetPulse" /></Link>
            <p className="mt-5 text-sm leading-6 text-slate-500">Focused learning, intentional practice, and clear analytics for ambitious JEE and NEET aspirants.</p>
            <div className="mt-6 space-y-1 text-xs text-slate-500"><a href="tel:+918921303873" className="block hover:text-emerald-700">+91 89213 03873</a><a href="mailto:jeeneetpulseofficial@gmail.com" className="block hover:text-emerald-700">jeeneetpulseofficial@gmail.com</a></div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {groups.map((group) => <div key={group.title}><h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-900">{group.title}</h3><ul className="mt-5 space-y-3">{group.links.map(([label, href]) => <li key={label}><Link href={href} className="text-sm text-slate-500 transition hover:text-emerald-700">{label}</Link></li>)}</ul></div>)}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-5 border-t border-slate-100 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} JeeNeetPulse. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Instagram"><img src="/Instagram.svg" alt="" className="h-5 w-5 opacity-60 transition hover:opacity-100" /></a>
            <a href="https://t.me/shivvishnoiphysics" aria-label="Telegram"><img src="/telegram.png" alt="" className="h-5 w-5 opacity-60 transition hover:opacity-100" /></a>
            <a href="https://www.youtube.com/@JEE-NEETPULSE" aria-label="YouTube"><img src="/youtube.png" alt="" className="h-6 w-6 opacity-60 transition hover:opacity-100" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
