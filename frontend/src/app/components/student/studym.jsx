import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../services/api";

const StudyMaterials = () => {
  const [studyMaterials, setStudyMaterials] = useState(null);

  useEffect(() => {
    const fetchStudyMaterials = async () => {
      try {
        const response = await api.get("/api/lecture-notes/?is_featured=true");
        setStudyMaterials(response.data);
      } catch (error) {
        console.error("Failed to fetch study materials:", error);
      }
    };

    fetchStudyMaterials();
  }, []);

  return (
    <div className="mt-8 font-inter">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">
            Notes and revision
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Featured study materials
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Curated notes and PDFs for faster revision across high-impact topics.
          </p>
        </div>

        {studyMaterials?.length === 0 ? (
          <p className="mt-6 text-sm text-slate-500">
            No lecture notes available.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {studyMaterials?.map((note, index) => {
              const hasPdf = Boolean(note.pdf_file);

              const card = (
                <div
                  className={`flex h-full items-start gap-4 rounded-[1.5rem] border p-5 transition ${
                    hasPdf
                      ? "border-slate-200 bg-[#f8faf9] hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,.08)]"
                      : "cursor-not-allowed border-slate-100 bg-slate-50"
                  }`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[11px] font-bold tracking-[0.16em] text-orange-600 shadow-sm">
                    PDF
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-lg font-semibold tracking-tight text-slate-950">
                      {note.pdf_title}
                    </h4>
                    <p className="mt-2 text-sm text-slate-500">{note.pdf_type}</p>
                    <p className="mt-4 text-sm font-semibold text-orange-700">
                      {hasPdf ? "Open material" : "Unavailable"}
                    </p>
                  </div>
                </div>
              );

              return hasPdf ? (
                <Link
                  key={index}
                  href={note.pdf_file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {card}
                </Link>
              ) : (
                <div key={index}>{card}</div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyMaterials;
