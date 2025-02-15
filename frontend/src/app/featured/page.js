"use client";
import React, { useState } from "react";
import StudyMaterials from "@/app/components/student/studym";
import FeaturedTests from "../components/student/Tests";
import PracticeQuestions from "@/app/components/student/questionsets";
import Classes from "@/app/components/student/Contents";
import featuredTests from "../components/student/Tests";

const FeaturedPage = () => {
  return (
    <div className="min-h-screen md:py-8 font-jakarta md:px-6 overflow-x-hidden">
      <div className="max-w-6xl mx-auto  bg-white py-8 rounded-xl p-6">
        <div>
          {/* <Exams id={courseId} /> */}
          {/* <PracticeQuestions id={courseId} /> */}
          <Classes />
          <FeaturedTests/>
          <StudyMaterials/>
          
        </div>
      </div>
    </div>
  );
};

export default FeaturedPage;
