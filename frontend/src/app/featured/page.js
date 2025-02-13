"use client";
import React, { useState } from "react";
import StudyMaterials from "@/app/components/student/studym";
import FeaturedTests from "../components/student/Tests";
import PracticeQuestions from "@/app/components/student/questionsets";
import Classes from "@/app/components/student/Contents";
import featuredTests from "../components/student/Tests";

const FeaturedPage = () => {
  return (
    <div className="min-h-screen md:py-8 font-jakarta md:px-6">
      <div className="max-w-6xl mx-auto  bg-white py-8 rounded-xl p-6">
      <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-6">Featured Contents</h2>
      <div className="w-full hidden md:block h-[1px] bg-gray-300 mb-8"></div>
        <div>
          {/* <Exams id={courseId} /> */}
          {/* <PracticeQuestions id={courseId} /> */}
          <FeaturedTests/>
          <StudyMaterials/>
          <Classes />
        </div>
      </div>
    </div>
  );
};

export default FeaturedPage;
