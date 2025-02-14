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
  const [progressArray, setProgressArray] = useState([]);
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
    <div className="min-h-screen md:py-8 font-inter md:px-6">
      <div className="max-w-6xl min-h-[80vh] mx-auto  p-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Profile
        </h2>
        <div className="hidden md:block h-[1px] bg-gray-300 mb-8"></div>
        <div className="mt-6 flex flex-col gap-6">
          <div>
            <h3 className="text-2xl font-instSansB mb-4  text-gray-800">
              User Details
            </h3>
            <p className="mt-2 text-gray-700 font-instSansB">
              Name: {userDetails?.name}
            </p>
            <p className="mt-2 text-gray-700 font-instSansB">
              Email: {userDetails?.email}
            </p>
          </div>
          <div>
            <h3 className=" text-2xl font-instSansB mb-4 text-gray-800">
              Courses Enrolled
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
              {coursesData.length === 0 ? (
                <p className="text-gray-600 mt-4 mb-4">No courses enrolled.</p>
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
        <div className="text-2xl font-instSansB mt-2 text-gray-800">
          Additional{" "}
        </div>

        <div
          onClick={() => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user_id");
            router.push("/signin");
          }}
          className="font-bold hover:bg-slate-100 h-full py-4 px-2 font-instSansB mt-2"
        >
          Logout &gt;
        </div>
        <div
          onClick={() => {
            router.push("/contact");
          }}
          className="font-bold hover:bg-slate-100 h-full border-t py-4 px-2 font-instSansB"
        >
          Have any enquires? lets us know.{" "}
        </div>
        <div
          onClick={() => {
            router.push("/contact");
          }}
          className="font-bold hover:bg-slate-100 h-full border-t py-4 px-2 font-instSansB rounded-b-xl"
        >
          Frequently Asked Questions{" "}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
