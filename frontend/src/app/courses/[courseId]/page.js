"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/app/components/productCard";
import { useParams, useRouter } from "next/navigation";
import api from "../../services/api";
import { toast } from "sonner";
import { Router } from "lucide-react";


const CoursePage = () => {
  const { courseId } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [userId, setUserId] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/api/courses"); 
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };

    fetchCourses();
  }, []);

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

  useEffect(() => {
    if (userId) {
      api
        .get(`/api/userCourses/${userId}`)
        .then((response) => {
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

  const handleBuyNowClick = () => {
    if (!isEnrolled) {
      // Redirect to checkout page if user is not enrolled
      router.push(`/checkout/${courseId}`);
    }
  };
  if (loading) {
    return (
      <div className="text-center mt-20 text-2xl font-bold text-gray-700">
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
    <div className="min-h-screen md:py-8 bg-gray-50 font-jakarta md:px-6 overflow-x-hidden">
      <div className="max-w-4xl mx-auto bg-white py-8 rounded-xl border-g p-6 border">
        {/* Course Title */}
        <h3 className="text-xl xs:text-3xl sm:text-4xl font-bold font-inter text-gray-800">
          {course.title}
        </h3>
        <hr className="mt-2 -mr-[40vw] md:mr-0 mb-4 md:mb-8" />

        {/* Price & Buy Section */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="text-md xs:text-xl sm:text-3xl font-bold text-gray-800">
            ₹{course.current_price}{" "}
            <span className="text-gray-500 line-through text-sm xs:text-lg sm:text-xl font-semibold ml-1 md:ml-2">
              ₹{course.price}
            </span>
            <span className=" text-teal-700 text-sm xs:text-lg sm:text-xl font-semibold ml-1 md:ml-2">
              {Math.round(((course.price - course.current_price) / course.price) * 100)}% off
            </span>
          </div>
       
            <button
                onClick={handleBuyNowClick}
              className={`px-6 max-xs:px-3 py-2 sm:py-2.5 text-xs xs:text-sm sm:text-lg font-semibold rounded-full transition-all 
                ${isEnrolled ? "bg-gray-400 cursor-not-allowed text-white" : "bg-teal-600 hover:bg-teal-700 text-white"}`}
              disabled={isEnrolled}
            >
              {isEnrolled ? "Already Enrolled" : "Buy Now"}
            </button>
        </div>

        <p className="max-xs:text-sm text-md  leading-relaxed mt-4 mb-6 text-gray-600">{course.description}</p>

        {/* Portions Covered */}
        <div className="mt-2">
          <h4 className="text-md xs:text-xl sm:text-2xl font-bold text-gray-700 mb-2">Portions Covered</h4>
          <p className="max-xs:text-sm text-md text-gray-600  text-justify font-jakarta2">{course.portions}</p>
        </div>

        {/* What's Included */}
        <div className="mt-4 pt-6 ">
          <h3 className="text-md xs:text-xl sm:text-2xl font-bold  text-gray-700 mb-4">What's Included</h3>
          <hr className="mt-2 -mr-[40vw] md:mr-0 mb-4 md:mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: "Watch Hours", value: course.watch_hours },
              { label: "Classes", value: course.classes },
              { label: "Test Series", value: course.chapters },
              { label: "Videos", value: course.classes },
            ].map((item, index) => (
              <div key={index} className="text-center bg-gray-50 border-2 border-t-4 border-teal-700 rounded-2xl py-4 shadow-md">
                <span className="text-md xs:text-xl sm:text-2xl font-bold text-gray-800">{item.value}+</span>
                <p className="text-md max-xs:text-xs text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Examinations and Video Classes */}
        <div className="mt-4 sm:mt-8  pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="xs:text-xl sm:text-2xl font-bold  mb-2 text-gray-700 sm:mb-5">Examinations</h4>
              <ul className="list-disc pl-4  space-y-1 sm:space-y-4 text-sm text-justify xs:text-md sm:text-[15px] font-jakarta2   text-gray-800">
                {course.content_left_1 && <li>{course.content_left_1}</li>}
                {course.content_left_2 && <li>{course.content_left_2}</li>}
                {course.content_left_3 && <li>{course.content_left_3}</li>}
                {course.content_left_4 && <li>{course.content_left_4}</li>}
              </ul>
            </div>

            {/* Right Column - Videos */}
            <div>
              <h4 className="text-md xs:text-xl sm:text-2xl font-bold  mb-2 sm:mb-5 text-gray-700 ">Video Classes</h4>
              <ul className="list-disc pl-4  space-y-1 text-sm  sm:space-y-4  text-justify max-xs:text-md sm:text-[15px]   font-jakarta2   text-gray-800">
                {course.content_right_1 && <li>{course.content_right_1}</li>}
                {course.content_right_2 && <li>{course.content_right_2}</li>}
                {course.content_right_3 && <li>{course.content_right_3}</li>}
                {course.content_right_4 && <li>{course.content_right_4}</li>}
              </ul>
            </div>
          </div>
        </div>

      </div>
      {/* Other Courses */}
      <div className="hidden bg-white py-8 p-6">
        <h3 className="text-lg xs:text-3xl sm:text-3xl font-bold font-inter text-gray-800">
          Other Courses
        </h3>
        <hr className="mt-2 -mr-[40vw] md:mr-0 mb-4 md:mb-8" />

        <div className="gap-4 mb-8">
          {courses.map((course) => (
            <ProductCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
