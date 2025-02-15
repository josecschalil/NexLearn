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
            <h3 className="text-xl sm:text-4xl  md:mb-4 font-bold text-gray-800 font-inter">
                My Courses
              </h3>
              <hr className="mt-2 -mr-[40vw] mb-6 md:mb-8"></hr>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      <div className="border border-white transition-all duration-300 hover:border-gray-400 rounded-2xl ">
                      <div className="relative">
                        <img
                          className=" w-full rounded-2xl  aspect-video  object-cover "
                          src={course.img}
                          alt={course.title}
                        />
                      </div>
                      <div className="flex pt-6 -mt-6 flex-col items-center justify-between shadow transition-all duration-100 rounded-2xl">
                        <div className="flex items-center mr-auto font-inter p-3">
                          <div className="h-10 w-10  flex items-center mr-3 justify-center rounded-full">
                            <span
                              role="img"
                              aria-label="course-icon"
                              className="text-2xl"
                            >
                              🎓
                            </span>
                          </div>
                          <div>
                            <h3 className="text-sm xs:text-lg font-bold text-gray-800">
                              {course.title}
                            </h3>
                            <p className="text-[11px] xs:text-sm text-gray-500 mt-1 ">
                              {course.chapters} Chapters •{" "}
                              {(+course.classes || 0) +
                                (+course.tests || 0) +
                                (+course.studymaterials || 0)}{" "}
                              Contents
                            </p>
                          </div>
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
