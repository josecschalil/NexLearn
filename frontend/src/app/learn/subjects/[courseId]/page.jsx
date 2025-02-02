"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useParams } from "next/navigation";
import api from "../../../services/api";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const Contents = () => {


  const [subjects, setSubjects] = useState(null);
  const [course,setCourse]=useState(null);

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
    <div className="min-h-screen md:bg-gray-50 md:py-8 font-jakarta md:px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl  p-6 ">

      <div className="flex flex-col gap-4  mb-6">
          {/* Course Title */}
          <div className="flex items-center">
            <Link href={"/student-portal"}> <div className="border w-fit h-fit px-2 pb-1 pt-[2px] rounded-lg hover:border-gray-500 mr-3">&lt;</div></Link>
         
          <h2 className="text-2xl font-bold text-gray-700 font-instSansB">
        {course?.title}
          </h2>
          </div>
          <h2 className="text-xl font-bold text-gray-700 font-instSansB">
      Subjects
          </h2>
          </div>
      <div className="space-y-4">
        {subjects?.map((subject, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border hover:border-gray-500 hover:shadow rounded-2xl mb-4"
          >
            {/* Course Details */}
            <div className="flex items-center space-x-4">
              {/* Icon */}
              <div className="h-12 w-12 flex items-center mr-3 justify-center bg-teal-100 rounded-full">
                <span role="img" aria-label="course-icon" className="text-2xl">
                  🎓
                </span>
              </div>
              {/* Details */}
              <div>
                <h3 className="text-lg font-instSansB font-bold text-gray-800">
                  {subject.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {subject.chapters} Chapters
                </p>
              </div>
            </div>

            {/* Progress and Button */}
            <div className="flex items-center space-x-4">
              <Link href={`/learn/chapters/${subject.id}`}>
                <button className="px-4 py-2 border border-teal-900 shadow rounded-full hover:bg-teal-800 hover:text-white text-sm">
                  Contents
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Contents;
