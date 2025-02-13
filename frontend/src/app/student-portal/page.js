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
      {userId ? (
        <div className="min-h-screen md:py-8 font-jakarta md:px-6 ">
          <div className="max-w-6xl mx-auto flex space-x-6 ">
            <div className="flex-1 bg-white py-8 rounded-xl p-6">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
                My Courses
              </h2>
              <div className="hidden md:block h-[1px] bg-gray-300 mb-8"></div>
              <div className="grid grid-cols-3">
                {coursesData.length === 0 ? (
                  <div className="h-[70vh] sm:h-[80vh] flex flex-col items-center justify-center text-center">
                    <img
                      className="h-32 mb-4"
                      src="/reading.png"
                      alt="Reading"
                    />
                    <p>No courses enrolled.</p>
                  </div>
                ) : (
                  coursesData.map((course, index) => (
                    <Link key={index} href={`/student-portal/${course.id}`}>
                      <div className="flex flex-col items-center justify-between p-4 border hover:border-gray-500 hover:shadow transition-all duration-100 rounded-2xl mb-4">
                        <div className="relative">
                          <img
                            className=" w-full rounded-2xl   object-cover "
                            src={course.img}
                            alt={course.title}
                          />
                          {course.discount && (
                            <div className="absolute top-2 right-2 bg-teal-500 text-white text-[10px] px-2 py-[2px] rounded-sm">
                              {course.discount}% OFF
                            </div>
                          )}
                        </div>
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
                            <h3 className="text-lg font-bold text-gray-800">
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

                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[70vh] sm:h-[80vh] flex flex-col items-center justify-center text-center">
          <img className="h-32 mb-4" src="/reading.png" alt="Reading" />
          <p>Please log in to access tests and classes.</p>
        </div>
      )}
    </div>
  );
};

export default CourseList;
