"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
import axios from "axios";
import api from "../services/api";
const CourseList = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [progressArray, setProgressArray] = useState([]);
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
            return api.get(
              `/api/courses/${coursedata.course_id}`
            );
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
        {userId ? (
          <div className="min-h-screen bg-gray-50 md:py-8 font-jakarta md:px-6">
            <div className="max-w-5xl min-h-screen mx-auto bg-white md:shadow-md md:rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-700 font-instSansB">
                  My Courses
                </h2>
              </div>
  
              {coursesData.length === 0 ? (
                <div className="h-[70vh] sm:h-[80vh] flex flex-col items-center justify-center text-center">
                <img className="h-32 mb-4" src="/reading.png" alt="Reading" />
                <p>No courses enrolled.</p>
              </div>
              ) : (
                coursesData.map((course, index) => (
                  <Link key={index} href={`/student-portal/${course.id}`}>
                    <div className="flex items-center justify-between p-4 border hover:border-gray-500 hover:shadow transition-all duration-100 rounded-2xl mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-blue-100 flex items-center mr-3 justify-center rounded-full">
                          <span
                            role="img"
                            aria-label="course-icon"
                            className="text-2xl"
                          >
                            🎓
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font font-bold font-instSansB text-gray-800">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1 hidden sm:block">
                            {course.chapters} Chapters •{" "}
                            {(+course.classes || 0) +
                              (+course.tests || 0) +
                              (+course.studymaterials || 0)}{" "}
                            Contents
                          </p>
                        </div>
                      </div>
  
                      <div className="flex items-center space-x-4">
                        <div className="hidden md:block w-32 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-teal-500 h-full"
                            style={{ width: `${progressArray[index]}%` }}
                          ></div>
                        </div>
                        <span className="hidden md:block text-sm text-gray-500">
                          {progressArray[index]}% complete
                        </span>
  
                        <button className="max2:hidden px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-2xl text-sm">
                          Contents
                        </button>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="h-[70vh] sm:h-[80vh] flex flex-col items-center font-instSansB  justify-center text-center">
            <img className="h-32 mb-4" src="/reading.png" alt="Reading" />
            <p>Please log in to access tests and classes.</p>
          </div>
        )}
      </div>
    );
  };
  
  export default CourseList;
