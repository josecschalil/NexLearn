"use client";
import React, { useState, useEffect } from "react";
import api from "../services/api";
import InfoCard from "../components/Card";
import useAuthentication from "@/hooks/useAuthentication";
const CourseList = () => {
  const { isAuthenticated, userdetails } = useAuthentication();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("user_id");
      if (storedUserId) {
        setUserId(storedUserId);
      }
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      // console.log("Fetching courses for user:", userId);

      api
        .get(`/api/userCourses/${userId}`)
        .then((response) => {
          // console.log("User courses data:", response.data);

          const courses = response.data.courses;
          // console.log("Courses found:", courses);

          const coursePromises = courses.map((coursedata) => {
            return api.get(`/api/courses/${coursedata.course_id}`);
          });

          Promise.all(coursePromises)
            .then((courseResponses) => {
              const coursesData = courseResponses.map((res) => res.data);
              console.log("Course details fetched:", coursesData);

              setCoursesData(coursesData);

              const progressArray = courses.map((course) => course.progress);
              setProgressArray(progressArray);
            })
            .catch((error) => {
              console.error("Error fetching course details:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching user courses:", error);
        });
    }
  }, [userId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {userdetails.is_staff? (
        <div className="min-h-screen md:py-8 font-jakarta md:px-6  overflow-x-hidden">
          <div className="max-w-6xl mx-auto flex space-x-6 ">
            <div className="flex-1 bg-white py-8 rounded-xl p-6">
            <h3 className="text-xl sm:text-4xl  md:mb-4 font-bold text-gray-800 font-inter">
                Admin Panel
              </h3>
              <hr className="mt-2 -mr-[40vw] mb-6 md:mb-8"></hr>
              <InfoCard
        title="Create New Exams"
        description="Resume or analyse previously written tests and strategise."
        icon="🏆"
        buttonText="Create"
        link={`/admin/create-exam`}
      />
      <InfoCard
        title="Upload Questions"
        description="Resume or analyse previously written tests and strategise."
        icon=" 🛠️"
        buttonText="Upload"
        link={`/admin/add-questions`}
      />
      
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[70vh] sm:h-[80vh] flex flex-col items-center justify-center text-center">
          <img className="h-32 mb-4" src="/reading.png" alt="Reading" />
          <p>Login in from an admin account</p>
        </div>
      )}
    </div>
  );
};

export default CourseList;
