"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import api from "../../../services/api";

const SubjectPage = () => {
  const [chapters, setChapters] = useState(null);
  const [subject, setSubject] = useState(null);
  const { subjectId } = useParams();

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await api.get(
          `/api/chapters/?subject_id=${subjectId}`
        );
        if (response.status === 200) {
          setChapters(response.data);
        } else {
          console.error("Failed to fetch chapters:", response.status);
        }
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    fetchChapters();
  }, [subjectId]);

  useEffect(() => {
    api
      .get(`/api/subjects/${subjectId}`)
      .then((response) => {
        setSubject(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subject:", error);
      });
  }, [subjectId]);

  return (
    <div className="min-h-screen md:py-8 font-jakarta md:px-6 overflow-x-hidden">
      <div className="max-w-6xl mx-auto bg-white p-6">
        <div className=" gap-4 ">
          <h3 className="text-xl  xs:text-3xl sm:text-4xl  md:mb-4 font-bold text-gray-800 font-inter">
            {subject?.name}
          </h3>
          <hr className="mt-2 -mr-[40vw] mb-4 md:mb-8"></hr>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-4 md:gap-y-6">
          {chapters?.map((chapter, index) => (
            <Link
              key={index}
              className="border border-gray-300 rounded-2xl shadow-sm transition-all hover:shadow-md overflow-hidden flex items-center"
              href={`/learn/contents/${chapter.id}`}
            >
              <div className="ml-3 flex items-center justify-center text-2xl">
                {chapter.icon || "📖"}
              </div>
              <div className="p-4 flex-1 overflow-hidden">
              <h4 className="max-xs:text-[14px] font-inter font-semibold text-gray-900 truncate">
                  {chapter.name}
                </h4>
                <p className="text-[12px] xs:text-sm  text-gray-700 font-istok mt-1">
                  {chapter.contents || "23"} Contents
                </p>
              </div>
              <button className="px-4 py-2 mr-4 font-istok sm:block border border-teal-900 transition-all duration-100 rounded-full hover:bg-teal-800 hover:text-white text-xs sm:text-sm">
                View
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
