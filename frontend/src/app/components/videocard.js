import Link from "next/link";

export default function VideoCard({ title, faculty, time, link, url }) {
  return (
    <Link href={url} className="group block overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,23,42,.1)]">
      <div className="relative aspect-video overflow-hidden rounded-[1.25rem] bg-slate-100">
        {link ? <img src={link} alt={title || "Video lesson"} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center text-3xl text-emerald-700">▶</div>}
        <span className="absolute inset-0 bg-gradient-to-t from-slate-950/35 to-transparent" />
        <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xs text-emerald-800 shadow-lg" aria-hidden="true">▶</span>
        {time && <span className="absolute bottom-3 right-3 rounded-full bg-slate-950/70 px-2 py-1 text-[10px] text-white backdrop-blur">{time}</span>}
      </div>
      <div className="p-3 pb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700">Featured lesson</p>
        <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-6 text-slate-950">{title}</h3>
        {faculty && <p className="mt-2 text-xs text-slate-500">{faculty}</p>}
      </div>
    </Link>
  );
}
