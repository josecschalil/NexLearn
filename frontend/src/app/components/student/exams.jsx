import React, { useState, useEffect } from "react";
import InfoCard from "../Card";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const Exams = ({ id, setIsTestCreatorOpen }) => {

  const userId = localStorage.getItem("user_id");
  const [isTestCreatorOpenInside, setIsTestCreatorOpenInside] = useState(false);

  const createtesttoggler = () => {
    const newState = !isTestCreatorOpenInside;
    setIsTestCreatorOpenInside(newState);
    setIsTestCreatorOpen(newState); 
  };

  return (
    <div className="relative ">

      <div  onClick={createtesttoggler} className="flex transition-all rounded-2xl hover:shadow hover:border-gray-500 duration-100  items-center justify-between p-4 border border-gray-300  mb-4">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 bg-none flex items-center justify-center rounded-full">
            <span role="img" aria-label="exam-icon" className="text-xl">
              🛠️
            </span>
          </div>
          {/* Details */}
          <div>
          <h3 className="text-[14px] xs:text-lg sm:text-lg font-bold font-inter text-gray-800">
              Custom Tests
            </h3>
            <p className="text-[12px] xs:text-sm sm:text-sm text-gray-500 mt-1">
              Create and customize your own test sessions!
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center ">
          <button
            onClick={createtesttoggler}
            className="px-4 py-2 hidden sm:block border border-teal-900 transition-all duration-100 rounded-full hover:bg-teal-800 hover:text-white text-sm"
          >
            Create
          </button>

        </div>
      </div>

      <InfoCard
        title="Previous Tests & History"
        description="Resume or analyse previously written tests and strategise."
        icon="📈"
        buttonText="View"
        link={`/tests/custom/${userId}`}
      />


      <InfoCard
        title="Proctored Examinations"
        description="Write tests carefully curated by our faculties."
        icon="🏆"
        buttonText="View"
        link={`/tests/proctored/${id}`}
      />
      <InfoCard
        title="Watch Classes"
        description="Original and dedicated classes for each chapter."
        icon="🎥"
        buttonText="View"
        link={`/learn/subjects/${id}`}
      />
      <InfoCard
        title="Practice Questions"
        description="Exam oriented questions and answers."
        icon="📜"
        buttonText="View"
        link={`/questions/${id}`}
      />
      <InfoCard
        title="General & Announcements"
        description="Latest updates and information."
        icon="🎓"
        buttonText="View"
        link={`/`}
      />
    </div>
  );
};

export default Exams;
