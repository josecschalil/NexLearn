"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import PaymentButton from "@/app/components/PaymentButton";
import Link from "next/link";
import useAuthentication from "@/hooks/useAuthentication";
import { toast } from "sonner";
import axios from "axios";
import api from "../../services/api";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, userDetails } = useAuthentication();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [userId, setUserId] = useState(null);

  const router = useRouter();

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
      api
        .get(`/api/userCourses/${userId}`)
        .then((response) => {
          console.log(response?.data.courses);
          const isEnrolled = response?.data.courses.some(
            (course) => course.course_id === courseId
          );

          if (isEnrolled) {
            setIsEnrolled(true);
          } else {
            setIsEnrolled(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching user courses:", error);
        });
    }
  }, [userId]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/api/courses/${courseId}`);
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch course data.");
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-2xl  font-bold text-gray-700">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-2xl font-bold text-red-500">
        {error}
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center mt-20 text-2xl font-bold text-gray-700">
        Course Not Found
      </div>
    );
  }

  const handlePayment = () => {
    if (isAuthenticated) {
      alert(
        `Payment through PhonePe for ${course.title} will be processed. Now adding to userCourses.`
      );
      addCourseToUser();
    } else showPopup("User not Logged In. Log In to enroll for Courses.");
  };

  const addCourseToUser = () => {
    const userId = localStorage.getItem("user_id");

    const data = {
      user: userId,
      course: courseId,
    };

    api
      .post(`/api/userCourses/`, data)
      .then((response) => {
        console.log("Course added to user successfully:", response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error adding the course to the user:",
          error
        );
      });
  };

  return (
    <div className=" min-h-screen md:bg-gray-100 py-10 font-jakarta overflow-x-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 md:gap-8">
        <div className="md:col-span-2 bg-white md:shadow-md md:rounded-2xl p-6 py-2 md:p-8">
          <div className=" pb-4  flex justify-between items-center md:border-b md:mb-4">
            <h1 className="text-2xl max-xs:text-xl md:text-4xl font-bold text-gray-800">
              {course.title}
            </h1>
          </div>
          <hr className="md:hidden -mr-[40vw] mb-6 md:mb-8"></hr>

          <Link href={`/courses/${course.id}`}>
            <button className="bg-teal-800 mb-4 text-white px-4 py-2 max-xs:text-xs text-sm font-semibold rounded-md shadow hover:bg-teal-600 transition">
              View Details
            </button>
          </Link>
          <p className="max-xs:text-sm  text-md md:text-lg text-justify text-gray-600 leading-relaxed">
            {course.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center border-t-4 border-teal-700 py-3 bg-gray-50 rounded-2xl shadow-md">
              <span className="max-xs:text-xl text-2xl font-bold text-gray-800">
                {course.watch_hours}+
              </span>
              <p className="text-gray-500 max-xs:text-xs text-sm">
                Watch Hours
              </p>
            </div>
            <div className="text-center border-t-4 border-teal-700 py-3 bg-gray-50 rounded-2xl shadow-md">
              <span className="max-xs:text-xl text-2xl font-bold text-gray-800">
                {course.classes}+
              </span>
              <p className="text-gray-500 max-xs:text-xs text-sm">Classes</p>
            </div>
          </div>
        </div>
        <div className="bg-white md:shadow-md md:rounded-2xl p-6 flex flex-col sm:gap-6">
          <div className="md:border-b mb-4 md:pb-4 ">
            <h2 className="text-xl max-xs:text-lg md:text-2xl font-bold text-gray-800 md:mb-2">
              Price Details
            </h2>
            <hr className="md:hidden -mr-[40vw] mb-2 "></hr>
            <div className="text-lg max-xs:text-[15px] font-semibold text-gray-800">
              ₹{course.current_price}{" "}
              <span className="text-gray-500 line-through text-xl max-xs:text-[15px]">
                ₹{course.price}
              </span>
              <span className="ml-2 text-teal-500 text-xl max-xs:text-[15px]">
                ({" "}
                {Math.round(
                  ((course.price - course.current_price) / course.price) * 100
                )}
                % off)
              </span>
            </div>
          </div>

          {!userId && (
            <button
              onClick={()=>{toast.error("Sign In to finish Enrollment.")}}
              className="bg-teal-800 mb-4 text-white px-4 py-2 max-xs:text-xs text-sm font-semibold rounded-md shadow  transition"
            >
              Buy Now
            </button>
          )}

          {userId && (
            <div>
              <div className="md:border-b mb-4 md:pb-4">
                <h2 className="text-xl max-xs:text-lg md:text-2xl font-bold text-gray-800 md:mb-2">
                  User Details
                </h2>
                <hr className="md:hidden -mr-[40vw] mb-2 "></hr>
                <div className="text-gray-600 font-jakarta2 text-md max-xs:text-sm md:text-lg">
                  <p>
                    Name:{" "}
                    <span className="font-semibold">{userDetails?.name}</span>
                  </p>
                  <p>
                    Email:{" "}
                    <span className="font-semibold">{userDetails?.email}</span>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl max-xs:text-lg md:text-2xl font-bold text-gray-800 md:mb-4">
                  Payment Options
                </h2>
                <hr className="md:hidden -mr-[40vw] mb-6 md:mb-8"></hr>
                <div className="flex items-center gap-3">
                  {isEnrolled ? (
                    <div className="text-teal-800 font-semibold">
                      Already Enrolled
                    </div>
                  ) : (
                    <PaymentButton
                      course={course}
                      userId={userId}
                      userDetails={userDetails}
                      isAuthenticated={isAuthenticated}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
