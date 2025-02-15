"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import PaymentButton from "@/app/components/PaymentButton";
import Link from "next/link";
import useAuthentication from "@/hooks/useAuthentication";
import showPopup from "@/app/components/Toast";
import axios from "axios";
import api from "../../services/api";

const CheckoutPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, userDetails } = useAuthentication();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [userId, setUserId] = useState(null);

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
    <div className="min-h-screen bg-gray-100 py-10 font-jakarta">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Course Details */}
        <div className="md:col-span-2 bg-white shadow-md rounded-lg p-8">
          {/* Header */}
          <div className="border-b pb-4 mb-4 flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-800">{course.title}</h1>
            <Link href={`/courses/${course.id}`}>
              <button className="bg-teal-500 text-white px-4 py-2 text-sm font-semibold rounded-md shadow hover:bg-teal-600 transition">
                View Details &gt;
              </button>
            </Link>
          </div>

          {/* Course Info */}
          <p className="text-lg text-justify text-gray-600 leading-relaxed">
            {course.description}
          </p>

          {/* Features Summary */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center border-t-4 border-teal-700 py-3 bg-gray-50 rounded-lg shadow-md">
              <span className="text-2xl font-bold text-gray-800">
                {course.watch_hours}+
              </span>
              <p className="text-gray-500 text-sm">Watch Hours</p>
            </div>
            <div className="text-center border-t-4 border-teal-700 py-3 bg-gray-50 rounded-lg shadow-md">
              <span className="text-2xl font-bold text-gray-800">
                {course.classes}+
              </span>
              <p className="text-gray-500 text-sm">Classes</p>
            </div>
          </div>
        </div>

        {/* Right Column - Pricing, Profile, and Payment */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-6">
          {/* Pricing Section */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Price Details
            </h2>
            <div className="text-2xl font-semibold text-gray-800">
              ₹{course.current_price}{" "}
              <span className="text-gray-500 line-through text-lg">
                ₹{course.price}
              </span>
              <span className="ml-2 text-teal-500 text-lg">
                ({course.discount}% off)
              </span>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              User Profile
            </h2>
            <div className="text-gray-600 text-lg">
              <p>
                Name: <span className="font-semibold">{userDetails?.name}</span>
              </p>
              <p>
                Email:{" "}
                <span className="font-semibold">{userDetails?.email}</span>
              </p>
            </div>
          </div>

          {/* Payment Options */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Payment Options
            </h2>
            <div className="flex items-center gap-3">
            
               {isEnrolled ? (
              <div className="text-teal-800 font-semibold">Already Enrolled</div>
            ) : (
              <PaymentButton course={course} userId={userId} userDetails={userDetails} onSuccess={handleSubmit} />
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
