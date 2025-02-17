"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
import useAuthentication from "@/hooks/useAuthentication";
import axios from "axios";
import api from "../../services/api";

const ProfilePage = () => {
  const router = useRouter();
  const { isAuthenticated, userDetails } = useAuthentication();
  const [coursesData, setCoursesData] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      api
        .get(`/api/userCourses/${userId}`)
        .then((response) => {
          const courses = response.data.courses;

          const coursePromises = courses.map((coursedata) => {
            return api.get(`/api/courses/${coursedata.course_id}`);
          });

          Promise.all(coursePromises)
            .then((courseResponses) => {
              const coursesData = courseResponses.map((res) => res.data);
              setCoursesData(coursesData);
            })
            .catch((error) => {
              console.error("Error fetching course details:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching user courses:", error);
        });
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>
          Please <Link href="/signin">sign in</Link> to access your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden min-h-screen md:py-8  md:px-6">
      <div className="max-w-6xl mx-auto space-x-6 ">
        <div className=" bg-white py-8 rounded-xl px-6">
          <h3 className="max-xs:text-xl  text-3xl sm:text-4xl   md:mb-4 font-bold text-gray-800 font-inter">
            Profile
          </h3>
          <hr className="mt-2 -mr-[40vw] mb-4 md:mb-8 "></hr>
          <div className="mt-6 flex flex-col gap-6">
            <div>
              <h3 className="max-xs:text-lg xs:text-2xl sm:text-2xl font-inter font-bold mb-4  text-gray-800">
                User Details
              </h3>
              <p className="max-xs:text-sm mt-2 text-gray-700 font-inter font-semibold">
                Name: {userDetails?.name}
              </p>
              <p className="max-xs:text-sm mt-2 text-gray-700 font-inter font-semibold">
                Email: {userDetails?.email}
              </p>

              {userDetails?.is_superuser && userDetails?.is_staff && (
                <button
                  onClick={() => router.push("/admin")}
                 className="bg-teal-800 mb-4 text-white px-4 py-2 mt-4 max-xs:text-xs text-sm font-semibold rounded-md shadow  transition"
                >
                  Access Admin Panel
                </button>
              )}
            </div>
            <div>
              <h3 className=" max-xs:text-lg xs:text-2xl sm:text-2xl font-inter font-bold mb-4 text-gray-800">
                Courses Enrolled
              </h3>
              {coursesData.length === 0 ? (
                <p className="text-gray-600 mt-4 mb-4">No courses enrolled.</p>
              ) : (
                coursesData.map((course, index) => (
                  <Link href={`/courses/${course.id}`} key={course.id}>
                    <div className="flex items-center justify-between p-4 border border-gray-400  hover:border-gray-500 hover:shadow transition-all duration-100 rounded-2xl mb-4">
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
                          <h3 className="max-xs:text-sm text-lg  text-gray-800 font-inter font-bold">
                            {course.title}
                          </h3>
                          <p className="max-xs:text-xs text-sm text-gray-500 mt-1">
                            {course.chapters} Chapters
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button className="px-4 py-2 max-xs:hidden bg-teal-800 font-istok max-xs:text-xs hover:bg-teal-900 text-white rounded-2xl text-sm">
                          Details
                        </button>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
