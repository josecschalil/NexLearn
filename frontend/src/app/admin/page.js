"use client";
import React, { useState, useEffect } from "react";
import InfoCard from "../components/Card";
import useAdminRedirect from "@/hooks/useAdminRedirect";

const CourseList = () => {

  const { isAuthenticated, userDetails, loading } = useAdminRedirect({
    redirectLink: "/",
    toastMessage: "Login from an admin account to access admin features."
  });

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!userDetails.is_staff) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Please log in to access this page.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen md:py-8 font-jakarta md:px-6 overflow-x-hidden">
        <div className="max-w-6xl mx-auto flex flex-wrap space-x-6">
          <div className="flex-1 bg-white py-8 rounded-xl p-6">
            <h3 className="text-xl sm:text-4xl md:mb-4 font-bold text-gray-800 font-inter">
              Admin Panel
            </h3>
            <hr className="mt-2 -mr-[40vw] mb-6 md:mb-8"></hr>
            <InfoCard
              title="Create New Exams"
              description="Resume or analyze previously written tests and strategize."
              icon="🏆"
              buttonText="Create"
              link={`/admin/create-exam`}
            />
            <InfoCard
              title="Upload Questions"
              description="Resume or analyze previously written tests and strategize."
              icon="🛠️"
              buttonText="Upload"
              link={`/admin/add-questions`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
