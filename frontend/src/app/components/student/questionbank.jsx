import React from "react";
import Link from "next/link";
import { subjects } from "@/app/mycourses/data";

const QuestionBank = ({ id }) => {
  const courseId = Number(id);
  console.log(courseId);
  console.log(subjects);
  const filteredSubjects =
    subjects?.filter((subject) => subject.courseId === courseId) || [];

  return (
    <div>
      <div className="flex justify-center gap-4  mb-2">
        <div className="w-full grid max2:grid-cols-1 grid-cols-2 md:grid-cols-3 gap-1  md:gap-6 ">
          {filteredSubjects.map((subject, index) => (
            <Link href={`/questions/subject/${subject.id}`} key={index}>
              <div className="flex items-center justify-between p-4 border transition-all duration-100 hover:border-gray-500 hover:shadow rounded-2xl   mb-4">
                {/* Course Details */}
                <div className="flex items-center space-x-4">
                  {/* Icon */}
                  <div className="h-10 w-10  flex items-center mr-3 justify-center rounded-full">
                    <span
                      role="img"
                      aria-label="course-icon"
                      className="text-2xl"
                    >
                      {subject.icon}
                    </span>
                  </div>
                  {/* Details */}
                  <div>
                    <h3 className="text-lg font-instSansB font-bold text-gray-800">
                      {subject.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {subject.videos} questions
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionBank;
