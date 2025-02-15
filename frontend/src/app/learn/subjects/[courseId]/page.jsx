"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useParams } from "next/navigation";
import api from "../../../services/api";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const Contents = () => {
  const [subjects, setSubjects] = useState(null);
  const [course, setCourse] = useState(null);

  const params = useParams();
  const { courseId } = params;

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await api.get(`/api/subjects/?course_id=${courseId}`);

        // Check if the response was successful
        if (response.status === 200) {
          setSubjects(response.data); // Directly use response.data
        } else {
          console.error("Failed to fetch subjects:", response.status);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, [courseId]);

  useEffect(() => {
    api
      .get(`/api/courses/${courseId}`)
      .then((response) => {
        console.log("Course fetched:", response.data);
        setCourse(response.data);
      })
      .catch((error) => {
        console.error("Error fetching course:", error);
      });
  }, [courseId]);

  return (
    <div className="min-h-screen md:py-8 font-jakarta md:px-6 overflow-x-hidden">
      <div className="max-w-6xl mx-auto bg-white p-6">
        <div className=" gap-4 ">
        <h3 className="text-xl  xs:text-3xl sm:text-4xl  md:mb-4 font-bold text-gray-800 font-inter">
            {course?.title}
          </h3>
          <hr className="mt-2 -mr-[40vw] mb-4 md:mb-8"></hr>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-4 md:gap-y-6 ">
          {subjects?.map((subject, index) => (
            <Link
              key={index}
              className="border border-gray-300 rounded-2xl shadow-sm transition-all hover:shadow-md overflow-hidden flex items-center"
              href={`/learn/chapters/${subject.id}`}
            >
              <div className="ml-3 flex items-center justify-center text-2xl">
                🎓
              </div>
              <div className="p-4 flex-1">
                <h4 className="text-[14px] xs:text-lg font-inter font-semibold text-gray-900 truncate">
                  {subject.name}
                </h4>
                <p className="text-[12px] xs:text-sm text-gray-700 font-istok mt-1">
                  {subject.chapters} Chapters
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

export default Contents;
