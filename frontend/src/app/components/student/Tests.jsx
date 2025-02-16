import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "../../services/api";
import useAuthentication from "@/hooks/useAuthentication";

const emojis = ["📖", "📝", "🎯", "📚", "✏️", "🏆", "💡", "🔬", "📊", "🔎"]; // Random emojis

const FeaturedTests = () => {
  const [featuredTests, setFeaturedTests] = useState(null);
  const { isAuthenticated, userDetails } = useAuthentication();

  useEffect(() => {
    const fetchFeaturedTests = async () => {
      try {
        const response = await api.get(`/api/featured-exams/`);
        setFeaturedTests(response.data);
      } catch (error) {
        console.error("Failed to fetch featured tests:", error);
      }
    };

    fetchFeaturedTests();
  }, []);

  return (
    <div className="my-4">
                     <h3 className="text-xl xs:text-3xl sm:text-4xl font-bold font-inter text-gray-800">
          Featured Exams
        </h3>
        <hr className="mt-2 -mr-[40vw] mb-5 md:mb-8"></hr>
      {featuredTests?.length === 0 ? (
        <p className="text-gray-600 mt-4">No Exams available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-4 md:gap-y-6 mt-4">
          {featuredTests?.map((test, index) => (
            <Link
              key={index}
              className="border border-gray-300 rounded-2xl shadow-sm transition-all hover:shadow-md overflow-hidden flex items-center"
              href={`/tests/proctored/exams/${test.exam_id}`}
            >
              <div className=" ml-3 flex items-center justify-center text-2xl">
                {emojis[index % emojis.length]}
              </div>

              <div className="p-4 flex-1">
                <h4 className=" max-xs:text-sm font-inter font-semibold text-gray-900 truncate">
                  {test.exam_title}
                </h4>
                <p className=" max-xs:text-xs text-sm text-gray-700 font-istok mt-1">
                  {test.time / 60} hours | Level {test.difficulty}
                </p>
              </div>

         
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedTests;
