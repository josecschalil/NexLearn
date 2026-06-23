import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../services/api";

const Contents = () => {
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get("/api/featured-videos/");
        setVideos(response.data);
      } catch (error) {
        console.error("Failed to fetch Videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="font-inter">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Resources
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Featured classes
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            A focused set of lessons for quick revision, concept strengthening,
            and exam-aligned practice.
          </p>
        </div>

        {videos?.length === 0 ? (
          <p className="mt-6 text-sm text-slate-500">No videos available.</p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos?.map((video, index) => (
              <Link key={index} href={video.video_path} className="group block">
                <div className="h-full rounded-[1.5rem] border border-slate-200 bg-[#f8faf9] p-3 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,.08)]">
                  <div className="relative overflow-hidden rounded-[1.2rem]">
                    <img
                      className="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      src={video.thumbnail}
                      alt={video.video_title}
                    />
                    <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-700">
                      Video lesson
                    </div>
                  </div>

                  <div className="mt-5 flex items-start gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[11px] font-bold tracking-[0.18em] text-emerald-700 shadow-sm">
                      PLAY
                    </span>
                    <div className="flex-1">
                      <h4 className="line-clamp-2 pr-2 text-lg font-semibold tracking-tight text-slate-950">
                        {video.video_title}
                      </h4>
                      <p className="mt-2 text-sm text-slate-500">
                        {video.subject || "Physics"} |{" "}
                        {video.language || "Hindi"}
                      </p>
                      <span className="mt-4 inline-flex items-center text-sm font-semibold text-emerald-700">
                        Watch now
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contents;
