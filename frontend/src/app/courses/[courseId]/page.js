"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/courses/${courseId}`
        );
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch course data.");
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`${apiUrl}/api/userCourses/${userId}`)
        .then((response) => {
          console.log(response?.data.courses)
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

  return (
    <div className="min-h-screen bg-gray-50 md:py-8 font-jakarta md:px-6">
      <div className="max-w-4xl mx-auto bg-white md:shadow-md md:rounded-2xl p-6">
        <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {course.title}
            </h1>
            <div className="text-2xl font-bold text-gray-800 mt-2">
              ₹{course.current_price}{" "}
              <span className="text-gray-500 line-through text-md">
                ₹{course.price}
              </span>
              <span className="ml-2 text-teal-500 text-md">
                ({course.discount}% off)
              </span>
            </div>
          </div>
          <Link href={isEnrolled ? "#" : `/checkout/${course.id}`}>
            <button
              className={`bg-teal-600 text-white px-4 py-2 text-nowrap text-md font-semibold rounded-xl 
      ${
        isEnrolled
          ? "bg-gray-400 cursor-not-allowed"
          : "hover:bg-teal-700 transition"
      }`}
              disabled={isEnrolled}
            >
              {isEnrolled ? "Already Enrolled" : "Buy Now"}
            </button>
          </Link>
        </div>
        <p className="text-md text-gray-600 leading-relaxed mb-8">
          {course.description}
        </p>

        <div>
          <h4 className="text-2xl font-bold text-gray-700 mb-2">
            Portions Covered:
          </h4>
          <p className="text-md text-gray-600">{course.portions}</p>
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-2xl font-bold text-gray-700 mb-4">
            What's Included:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Watch Hours", value: course.watch_hours },
              { label: "Classes", value: course.classes },
              { label: "Test Series", value: course.chapters },
              { label: "Videos", value: course.classes },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center border-t-4 border-teal-700 rounded-md py-3 bg-gray-50 shadow-md"
              >
                <span className="text-2xl font-bold text-gray-800">
                  {item.value}+
                </span>
                <p className="text-sm text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-2xl font-bold text-gray-700 mb-4">
            Additional Content:
          </h3>
          <div className="flex justify-between">
            <div className="w-1/2">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                Exams
              </h4>
              <ul className="list-disc pl-5">
                {course.content_left_1 && <li>{course.content_left_1}</li>}
                {course.content_left_2 && <li>{course.content_left_2}</li>}
                {course.content_left_3 && <li>{course.content_left_3}</li>}
                {course.content_left_4 && <li>{course.content_left_4}</li>}
              </ul>
            </div>
            <div className="w-1/2">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                Videos
              </h4>
              <ul className="list-disc pl-5">
                {course.content_right_1 && <li>{course.content_right_1}</li>}
                {course.content_right_2 && <li>{course.content_right_2}</li>}
                {course.content_right_3 && <li>{course.content_right_3}</li>}
                {course.content_right_4 && <li>{course.content_right_4}</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
