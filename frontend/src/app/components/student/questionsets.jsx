import React from "react";
import Link from "next/link";
import { practiceSet } from "@/app/mycourses/data";
import { useParams } from "next/navigation";

const PracticeQuestions = ({ id }) => {
  const courseId = Number(id);
  console.log(courseId);

  const filteredSets =
    practiceSet?.filter((practiceSet) => practiceSet.courseId === courseId) ||
    [];
  console.log(filteredSets);
  return (
    <div>
      <div className="space-y-4">
        {filteredSets.map((material, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border hover:border-gray-500 hover:shadow  transition-all duration-100 rounded-2xl mb-4"
          >
            {/* Course Details */}
            <div className="flex items-center space-x-4">
              {/* Icon */}
              <div className="h-10 w-10 bg-blue-100 flex items-center mr-3 justify-center rounded-full">
                <span role="img" aria-label="course-icon" className="text-2xl">
                  ❓
                </span>
              </div>
              {/* Details */}
              <div>
                <h3 className="text-lg font-instSansB text-gray-800">
                  {material.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {material.questions} questions
                </p>
              </div>
            </div>

            {/* Progress and Button */}
            <div className="flex items-center space-x-4">
              <Link key={index} href={`/mycourses/`}>
                <button className="px-4 py-2 border border-teal-900  rounded-full hover:bg-teal-800 hover:text-white text-sm">
                  Solve
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticeQuestions;
