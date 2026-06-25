// "use client";
// import Link from "next/link";
// import React, { useState } from "react";
// import {
//   FaBookmark,
//   FaList,
//   FaAtom,
//   FaBook,
//   FaGraduationCap,
// } from "react-icons/fa";

// const QuestionsPage = () => {
//   const [examType, setExamType] = useState("jee");

//   const subjects = {
//     iit: ["Physics", "Chemistry", "Mathematics"],
//     jee: ["Physics", "Chemistry", "Mathematics"],
//     neet: ["Physics", "Chemistry", "Biology"],
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50 font-jakarta font-semibold">
//       {/* Hero Section */}
//       <div className="hidden w-[100vw] h-[25vh] md:flex items-center justify-between  text-green-900">
//   {/* Left Line */}
//   <div className="flex-1 h-[1px] bg-green-900 rounded-full"></div>

//   {/* Center Text */}
//   <div className="flex items-center justify-center ">
//         <div className="text-center px-4">
//           <p className="text-4xl max-w-[750px] font-instSansB">
//             Master your exams with curated question banks and previous year questions.
//           </p>
//         </div>
//       </div>

//   {/* Right Line */}
//   <div className="flex-1 h-[1px] bg-green-900"></div>
// </div>

//       {/* Main Layout */}
//       <div className="flex flex-col md:flex-row flex-1 mx-4 gap-4 py-4 ">
//         {/* Sidebar Section */}
//         <aside className="md:w-[23%] shadow-lg p-6 pt-2 bg-white rounded-xl">
//           <div className="flex md: flex-col gap-3 mt-5">
//             <div className="group relative bg-white p-4 rounded-lg shadow-sm border border-gray-300 transition-all duration-300">
//               <Link
//                 href="/questions/bookmarked"
//                 className="hover:text-teal-900 flex items-center"
//               >
//                 <FaBookmark className="mr-2 text-teal-900" />
//                 View Bookmarks
//               </Link>
//             </div>
//             <div className="group relative bg-white p-4 rounded-lg  shadow-sm border border-gray-300 transition-all duration-300">
//               <Link
//                 href="/questions/user-lists"
//                 className="hover:text-teal-900 flex items-center"
//               >
//                 <FaList className="mr-2 text-teal-900" />
//                 Recommended Problems
//               </Link>
//             </div>
//             <div className="group relative bg-white p-4 rounded-lg shadow-sm border border-gray-300 transition-all duration-300">
//               <Link
//                 href="/questions/similar"
//                 className="hover:text-teal-900 flex items-center"
//               >
//                 <FaBook className="mr-2 text-teal-900" />
//                 Personal Lists
//               </Link>
//             </div>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-8 bg-white flex flex-col rounded-3xl  shadow-md border-black">
//           {/* Exam Selection */}
//           <div>
//             <p className="text-xl font-bold text-gray-800 mb-4 font-instSansB">Select your Exam</p>
//             <div className="flex gap-2 my-4">
//               {Object.keys(subjects).map((exam) => (
//                 <button
//                   key={exam}
//                   onClick={() => setExamType(exam)}
//                   className={`w-1/4 text-left px-4 py-3 rounded-lg  border-gray-300 border text-gray-800  uppercase transition-all duration-300 ease-in-out ${
//                     examType === exam
//                       ? "bg-teal-900 text-white border-black w-full"
//                       : "hover:bg-gray-200 hover:text-black"
//                   }`}
//                 >
//                   {exam}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Subjects Section */}
//           <div className="flex flex-col mt-6">
//             <h2 className="text-xl font-bold text-gray-800 mb-4 font-instSansB">Subjects</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {subjects[examType].map((subject, index) => (
//                 <Link
//                   href={`/questions/subject/${subject.toLowerCase()}_${examType}`}
//                   key={subject}
//                 >
//                   <div className="group hover:bg-gray-100 relative border-b-2 border-b-teal-900  bg-white p-6 rounded-lg shadow-md border-gray-300 border transition-all duration-100">
//                     {/* Subject Icon */}
//                     <div className="absolute top-3 right-3 text-gray-600 text-2xl">
//                       {index === 0 ? (
//                         <FaAtom />
//                       ) : index === 1 ? (
//                         <FaBook />
//                       ) : (
//                         <FaGraduationCap />
//                       )}
//                     </div>
//                     {/* Subject Details */}
//                     <h3 className="text-xl font-bold text-gray-800 mb-4 ">
//                       {subject}
//                     </h3>
//                     <p className="text-gray-600 text-sm leading-relaxed">
//                       Dive deep into {examType.toUpperCase()} {subject}{" "}
//                       questions.
//                     </p>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default QuestionsPage;

"use client";
import React, { useState } from "react";
import Exams from "@/app/components/student/exams";
import StudyMaterials from "@/app/components/student/studym";
import PracticeQuestions from "@/app/components/student/questionsets";
import QuestionBank from "../components/student/questionbank";
import Classes from "@/app/components/student/Contents";
import { courses } from "../mycourses/data";

const VideosPage = () => {
  const [examType, setExamType] = useState("jee");
  const [selectedSubject, setSelectedSubject] = useState("");

  // Map examType to course IDs
  const examTypeToCourseId = {
    jee: 4, // JEE Mains ID
    iit: 3, // JEE Advanced ID
    neet: 2, // NEET ID
  };

  // Get courseId based on selected examType
  const courseId = examTypeToCourseId[examType];

  return (
    <div className="min-h-screen md:bg-gray-50 md:py-8 font-jakarta md:px-6">
      <div className="max-w-5xl mx-auto bg-white md:shadow-md md:rounded-2xl p-6">
        {/* Page Header */}
        <div className="flex justify-between ">
          <h2 className=" text-2xl font-bold text-gray-700  font-instSansB">
            {/* Master your exams with curated question banks and previous year questions. */}
            Practice Questions
          </h2>

          {/* Exam Type Selection */}
          <div className="">
            <select
              id="examType"
              value={examType}
              onChange={(e) => {
                setExamType(e.target.value);
                setSelectedSubject("");
              }}
              className="w-full px-4 py-2 border rounded-xl font-instSansB focus:outline-none"
            >
              <option value="jee">JEE</option>
              <option value="iit">IIT JEE</option>
              <option value="neet">NEET</option>
            </select>
          </div>
        </div>

        {/* Dynamic Content Based on Selected Exam */}
        {examType && (
          <div>
            <h3 className="text-lg  font-instSansB text-gray-700 mt-8 my-4">
              Question Bank
            </h3>
            <QuestionBank id={courseId} />
            <h3 className="text-lg font-instSansB text-gray-700 my-4">
              Question Sets
            </h3>
            <PracticeQuestions id={courseId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideosPage;
