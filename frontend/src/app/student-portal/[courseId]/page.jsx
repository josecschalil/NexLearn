"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Exams from "@/app/components/student/exams";
import StudyMaterials from "@/app/components/student/studym";
import Link from "next/link";
import TestCreator from "@/app/components/student/TestCreator";
import api from "../../services/api";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const CoursePage = () => {
  const { courseId } = useParams();
  const [isTestCreatorOpen, setIsTestCreatorOpen] = useState(false);

  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("Contents");

  // const handleTabChange = (tab) => {
  //   setActiveTab(tab);
  // };

  useEffect(() => {
    api
      .get(`/api/courses/${courseId}`)
      .then((response) => {
        // console.log("Course fetched:", response.data);
        setCourse(response.data);
      })
      .catch((error) => {
        console.error("Error fetching course:", error);
      });
  }, [courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen md:py-8 font-jakarta md:px-6">
      <div className="max-w-5xl mx-auto  bg-white py-8 rounded-xl p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6"> {course.title}</h2>
        <div className="hidden md:block w-full h-[1px] bg-gray-300 mb-8"></div>

        {/* <div className="flex flex-col gap-4  mb-6">
          <div className="flex items-center">
            <Link href={"/student-portal"}>
              {" "}
              <div className="border w-fit h-fit px-2 pb-1 pt-[2px] rounded-lg hover:border-gray-500 mr-3">
                &lt;
              </div>
            </Link>

            <h2 className="text-2xl font-bold text-gray-700 font-instSansB"></h2>
          </div>

          <div className=" w-fit sm:w-full flex justify-between g-0 sm:gap-4 sm:justify-normal text-sm">
            {["Contents", "Recents"].map((tab) => (
              <button
                key={tab}
                className={`px-3 sm:px-4 py-1 sm:rounded-3xl bg-none sm:bg-gray-100 shadow-none sm:shadow ${
                  activeTab === tab
                    ? "bg-teal-900 sm:bg-teal-900 text-white rounded-full  border-black"
                    : "text-black border-black hover:sm-gray-100"
                }`}
                onClick={() => handleTabChange(tab)}
              >
                {tab.charAt(0).toUpperCase() +
                  tab.slice(1).replace("questions", "Practice Questions")}
              </button>
            ))}
          </div>
        </div> */}

        <div>
        {activeTab === "Contents" && <Exams id={courseId} setIsTestCreatorOpen={setIsTestCreatorOpen} />}
          {activeTab === "Recents" && <StudyMaterials id={courseId}  />}
        </div>
      </div>
      {isTestCreatorOpen && (
        <div className=" fixed inset-0 px-4 bg-black bg-opacity-50 z-20 flex justify-center items-center">
          <div className=" relative my-4 mb-8 bg-white border border-gray-500 border-t-0 p-4 px-0 rounded-2xl transition-transform h-auto duration-300 max-h-[90vh] overflow-y-auto">
            <div className="flex border-b pb-3">
              <div className="font-instSansB text-2xl text-gray-800 px-6">
                Creating Custom Test
              </div>
              <button
                onClick={() => setIsTestCreatorOpen(false)}
                className="absolute top-4 right-4 p-2 pb-1 pt-0 px-2  z-20 border border-gray-600 rounded-md text-xl hover:bg-slate-100  text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                &times;
              </button>
            </div>
            <div className="px-4">
              <TestCreator id={courseId} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
