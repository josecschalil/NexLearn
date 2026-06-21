"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import VideoCard from "../videocard";
import api from "../../services/api";

export default function VideoHighlights() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api.get("/api/lecture-videos/?is_featured=true")
      .then((response) => active && setVideos(response.data.slice(0, 3)))
      .catch((error) => console.error("Failed to fetch videos:", error))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Free resources</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">A better answer is one lesson away.</h2>
            <p className="mt-5 text-base leading-7 text-slate-600">Learn difficult concepts from focused video lessons by experienced tutors.</p>
          </div>
          <Link href="/featured" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-600">Explore all resources <span aria-hidden="true">→</span></Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {loading && [0, 1, 2].map((item) => <div key={item} className="h-[330px] animate-pulse rounded-[1.75rem] bg-slate-100" />)}
          {!loading && videos.map((video) => <VideoCard key={video.id} link={video.thumbnail} url={`/learn/video/${video.id}`} title={video.video_title} faculty={video.faculty || "JeeNeetPulse faculty"} />)}
        </div>
        {!loading && videos.length === 0 && <div className="mt-12 rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-sm text-slate-500">Featured lessons will appear here as soon as they are published.</div>}
      </div>
    </section>
  );
}
